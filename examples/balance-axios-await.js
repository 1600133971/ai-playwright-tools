import axios from "axios";

async function main() {
  let config = {
    method: 'get',
    maxBodyLength: Infinity,
    url: 'https://api.deepseek.com/user/balance',
    headers: { 
      'Accept': 'application/json', 
      'Authorization': 'Bearer sk-xxx'
    }
  };

  try {
    const response = await axios(config);
    console.log(JSON.stringify(response.data));
  } catch (error) {
    console.error(error);
  }
}

main();
