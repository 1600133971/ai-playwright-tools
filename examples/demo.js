import OpenAI from "openai";

const openai = new OpenAI({
  baseURL: 'https://api.deepseek.com',
  apiKey: 'sk-xxx',
});

async function main() {
  // Non-streaming:
  const completion = await openai.chat.completions.create({
    model: 'deepseek-chat',
    messages: [{ role: 'user', content: 'Introduce DeepSeek in 50 words' }],
  });
  console.log(completion.choices[0]?.message?.content);

  // Streaming:
  const stream = await openai.chat.completions.create({
    model: 'deepseek-chat',
    messages: [{ role: 'user', content: 'Introduce DeepSeek in 50 words' }],
    stream: true,
  });
  for await (const part of stream) {
    process.stdout.write(part.choices[0]?.delta?.content || '');
  }
  process.stdout.write('\n');
}

main();
