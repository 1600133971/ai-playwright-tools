import axios from "axios";

async function main() {
  let data = JSON.stringify({
    "messages": [
      {
        "content": "You are a helpful assistant",
        "role": "system"
      },
      {
        "content": "Hi",
        "role": "user"
      }
    ],
    "model": "deepseek-chat",
    "frequency_penalty": 0,
    "max_tokens": 2048,
    "presence_penalty": 0,
    "response_format": {
      "type": "text"
    },
    "stop": null,
    "stream": false,
    "stream_options": null,
    "temperature": 1,
    "top_p": 1,
    "tools": null,
    "tool_choice": "none",
    "logprobs": false,
    "top_logprobs": null
  });
      
  let config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: 'https://api.deepseek.com/chat/completions',
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
