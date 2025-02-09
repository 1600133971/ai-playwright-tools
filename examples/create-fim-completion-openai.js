import OpenAI from "openai";

const openai = new OpenAI({
  baseURL: 'https://api.deepseek.com/beta',
  apiKey: 'sk-xxx',
});

async function main() {
  const completion = await openai.completions.create({
    model: "deepseek-chat",
    prompt: "def fib(a):",
    suffix: "    return fib(a-1) + fib(a-2)",
    max_tokens: 128
  });
  console.log(completion);
}

main();
