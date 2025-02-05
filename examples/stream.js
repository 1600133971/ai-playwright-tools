import OpenAI from "openai";

const openai = new OpenAI({
  baseURL: 'https://api.deepseek.com',
  apiKey: 'sk-xxx',
});

async function main() {
  const runner = openai.beta.chat.completions
    .stream({
      model: "deepseek-chat",
      messages: [{ role: 'user', content: 'Introduce DeepSeek in 50 words' }],
    })
    .on('message', (msg) => console.log(msg))
    .on('content', (diff) => process.stdout.write(diff));

  for await (const chunk of runner) {
    console.log('chunk', chunk);
  }

  const result = await runner.finalChatCompletion();
  console.log(result);
}

main();
