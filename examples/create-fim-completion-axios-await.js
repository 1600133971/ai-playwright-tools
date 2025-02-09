import axios from "axios";

async function main() {
  let data = JSON.stringify({
    "model": "deepseek-chat",
    "prompt": "Once upon a time, ",
    "echo": false,
    "frequency_penalty": 0,
    "logprobs": 0,
    "max_tokens": 1024,
    "presence_penalty": 0,
    "stop": null,
    "stream": false,
    "stream_options": null,
    "suffix": null,
    "temperature": 1,
    "top_p": 1
  });

  let config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: 'https://api.deepseek.com/beta/completions',
    headers: { 
      'Content-Type': 'application/json', 
      'Accept': 'application/json', 
      'Authorization': 'Bearer sk-xxx'
    },
    data : data
  };

  try {
    const response = await axios(config);
    console.log(JSON.stringify(response.data));
  } catch (error) {
    console.error(error);
  }
}
  
main();