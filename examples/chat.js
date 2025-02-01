import OpenAI from "openai";
//import { HttpsProxyAgent } from 'https-proxy-agent';

const openai = new OpenAI({
  baseURL: 'https://api.deepseek.com',
  apiKey: 'sk-xxx',
  //httpAgent: new HttpsProxyAgent('http://user:pwd@url:port'),
});

async function main() {
  const completion = await openai.chat.completions.create({
    messages: [
      { role: "system", content: "You are a helpful assistant." },
      { role: "user", content: "Introduce DeepSeek in 100 words"}
    ],
    model: "deepseek-chat",
  });

  console.log(completion.choices[0].message.content);
}

main();
