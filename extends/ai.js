import sanitize from "sanitize-html";
import OpenAI from "openai";
import { createActions } from "./actions";
import { createFunctions } from "./functions";

export const ai = {
  prompt: (task, snapshot) => {
    return `This is your task: ${task}

* When creating CSS selectors, ensure they are unique and specific enough to select only one element, even if there are multiple elements of the same type (like multiple h1 elements).
* Avoid using generic tags like 'h1' alone. Instead, combine them with other attributes or structural relationships to form a unique selector.
* You must not derive data from the page if you are able to do so by using one of the provided functions, e.g. locator_evaluate.

Webpage snapshot:

\`\`\`
${snapshot.dom}
\`\`\`
`;
  },

  sanitizeHtml: (subject) => {
    return sanitize(subject, {
      // The default allowedTags list already includes _a lot_ of commonly used tags.
      // https://www.npmjs.com/package/sanitize-html#default-options
      //
      // I don't see a need for this to be configurable at the moment,
      // as it already covers all the layout tags, but we can revisit this if necessary.
      allowedTags: sanitize.defaults.allowedTags.concat([
        "button",
        "form",
        "img",
        "input",
        "select",
        "textarea",
      ]),
      // Setting allowedAttributes to false will allow all attributes.
      allowedAttributes: false,
    });
  },

  getSnapshot: async (page) => {
    return {
      dom: ai.sanitizeHtml(await page.content()),
    };
  },

  auto: async (task, page, options = {model: "", apiKey: "", baseURL: "", debug: false, MAX_TASK_CHARS: 2000} ) => {
    if (task.length > options.MAX_TASK_CHARS) {
      throw new Error(`Provided task string is too long, max length is ${options.MAX_TASK_CHARS} chars.`);
    }

    const openai = new OpenAI({
      apiKey: options.apiKey,
      baseURL: options.baseURL,
    });

    const snapshot = await ai.getSnapshot(page);
    const actions = createActions();
    const functions = createFunctions(page);
    const debug = options.debug;
    let lastFunctionResult = null;

    const messages = [{ role: "user", content: ai.prompt(task, snapshot) }];
    const tools = Object.values(actions).map((action) => ({ type: "function", function: action }));
    const callFunction = Object.values(functions).map((action) => ({ type: "function", function: action }));

    let message = null;
    let tool = null;
    let flag = false;

    if (debug) {
      console.log("> model", options.model);
      console.log("> messages", messages);
      //console.log("> tools", tools);
      //console.log("> functions", functions);
    }

    while (true) {
      const response = await openai.chat.completions.create({
        model: options.model,
        messages,
        tools: tools
      });

      message = response.choices[0].message;
      if (debug) {
        console.log("> message", message);
        if (message.role === "assistant" && message.tool_calls) {
          for (let tool of message.tool_calls) {
            console.log("> function", tool.function);
          }
        }
      }

      //message不包含tool_calls，则直接退出
      if (!message.tool_calls) {
        if (debug) {
          console.log("> message.tool_calls null, break");
        }
        break;
      }

      //message仅包含一项tool_call且函数名称是以result开头，则直接退出
      if (message.role === "assistant" && message.tool_calls.length === 1 && message.tool_calls[0].function.name.startsWith("result")) {
        lastFunctionResult = JSON.parse(message.tool_calls[0].function.arguments);
        if (debug) {
          console.log("> message.tool_calls result, break");
        }
        break;
      }

      messages.push(message);

      for (let tool of message.tool_calls) {
        const result = await callFunction.find(item => item.function.name === tool.function.name).function.function(JSON.parse(tool.function.arguments));
        const newMessage = {"role": "tool", "tool_call_id": tool.id, "content": JSON.stringify(result)}
        if (debug) {
          console.log("> tool", newMessage);
        }
  
        messages.push(newMessage);
      }
    };

    if (debug) {
      console.log("> messages", messages);
    }

    if (debug) {
      console.log("> lastFunctionResult", lastFunctionResult);
    }
    
    if (lastFunctionResult !== null && lastFunctionResult.errorMessage !== undefined) {
      throw new UnimplementedError(lastFunctionResult.errorMessage);
    }

    if (lastFunctionResult !== null && lastFunctionResult.assertion !== undefined) {
      return lastFunctionResult.assertion;
    }

    if (lastFunctionResult !== null && lastFunctionResult.query !== undefined) {
      return lastFunctionResult.query;
    }
  
    return undefined;
  },
};
