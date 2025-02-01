export const createFunctions = (page) => {
  return {
    locateElement: {
      function: async (args) => {
        const elementId = btoa(args.cssSelector);
        return {
          elementId,
        };
      },
      name: "locateElement",
    },
    locator_evaluate: {
      function: async (args) => {
        return {
          result: await page.locator(atob(args.elementId)).evaluate(eval(args.pageFunction)),
        };
      },
      name: "locator_evaluate",
    },
    locator_getAttribute: {
      function: async (args) => {
        return {
          attributeValue: await page.locator(atob(args.elementId)).getAttribute(
            args.attributeName
          ),
        };
      },
      name: "locator_getAttribute",
    },
    locator_innerHTML: {
      function: async (args) => {
        return { innerHTML: await page.locator(atob(args.elementId)).innerHTML() };
      },
      name: "locator_innerHTML",
    },
    locator_innerText: {
      function: async (args) => {
        return { innerText: await page.locator(atob(args.elementId)).innerText() };
      },
      name: "locator_innerText",
    },
    locator_textContent: {
      function: async (args) => {
        return {
          textContent: await page.locator(atob(args.elementId)).textContent(),
        };
      },
      name: "locator_textContent",
    },
    locator_inputValue: {
      function: async (args) => {
        return {
          inputValue: await page.locator(atob(args.elementId)).inputValue(),
        };
      },
      name: "locator_inputValue",
    },
    locator_blur: {
      function: async (args) => {
        await page.locator(atob(args.elementId)).blur();

        return { success: true };
      },
      name: "locator_blur",
    },
    locator_boundingBox: {
      function: async (args) => {
        return await page.locator(atob(args.elementId)).boundingBox();
      },
      name: "locator_boundingBox",
    },
    locator_check: {
      function: async (args) => {
        await page.locator(atob(args.elementId)).check();

        return { success: true };
      },
      name: "locator_check",
    },
    locator_uncheck: {
      function: async (args) => {
        await page.locator(atob(args.elementId)).uncheck();

        return { success: true };
      },
      name: "locator_uncheck",
    },
    locator_isChecked: {
      function: async (args) => {
        return { isChecked: await page.locator(atob(args.elementId)).isChecked() };
      },
      name: "locator_isChecked",
    },
    locator_isEditable: {
      function: async (args) => {
        return {
          isEditable: await page.locator(atob(args.elementId)).isEditable(),
        };
      },
      name: "locator_isEditable",
    },
    locator_isEnabled: {
      function: async (args) => {
        return { isEnabled: await page.locator(atob(args.elementId)).isEnabled() };
      },
      name: "locator_isEnabled",
    },
    locator_isVisible: {
      function: async (args) => {
        return { isVisible: await page.locator(atob(args.elementId)).isVisible() };
      },
      name: "locator_isVisible",
    },
    locator_clear: {
      function: async (args) => {
        await page.locator(atob(args.elementId)).clear();

        return { success: true };
      },
      name: "locator_clear",
    },
    locator_click: {
      function: async (args) => {
        await page.locator(atob(args.elementId)).click();

        return { success: true };
      },
      name: "locator_click",
    },
    locator_count: {
      function: async (args) => {
        return { elementCount: await page.locator(atob(args.elementId)).count() };
      },
      name: "locator_count",
    },
    locator_fill: {
      function: async (args) => {
        await page.locator(atob(args.elementId)).fill(args.value);

        return {
          success: true,
        };
      },
      name: "locator_fill",
    },
    locator_selectOption: {
      function: async (args) => {
        await page.locator(atob(args.elementId)).selectOption({ label: args.label });

        return {
          success: true,
        };
      },
      name: "locator_selectOption",
    },
    page_goto: {
      function: async (args) => {
        await page.goto(args.url);
        return {
          success: true,
        };
      },
      name: "page_goto",
    },
    page_screenshot: {
      function: async (args) => {
        await page.screenshot(args);
        return {
          success: true,
        };
      },
      name: "page_screenshot",
    },
    expect_toBe: {
      function: (args) => {
        return {
          actual: args.actual,
          expected: args.expected,
          success: args.actual === args.expected,
        };
      },
      name: "expect_toBe",
    },
    expect_notToBe: {
      function: (args) => {
        return {
          actual: args.actual,
          expected: args.expected,
          success: args.actual !== args.expected,
        };
      },
      name: "expect_notToBe",
    },
    resultAssertion: {
      function: (args) => {
        return args;
      },
      name: "resultAssertion",
    },
    resultQuery: {
      function: (args) => {
        return args;
      },
      name: "resultQuery",
    },
    resultAction: {
      function: () => {
        return null;
      },
      name: "resultAction",
    },
    resultError: {
      function: (args) => {
        return {
          errorMessage: args.errorMessage,
        };
      },
      name: "resultError",
    },
  };
};
