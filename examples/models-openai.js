import OpenAI from "openai";

const openai = new OpenAI({
  baseURL: 'https://api.deepseek.com',
  apiKey: 'sk-xxx',
});

async function main() {
  const models = await openai.models.list()
  for await (const model of models) {
    console.log(model);
  }
}

main();
