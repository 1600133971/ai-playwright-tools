import axios from "axios";

let config = {
  method: 'get',
  maxBodyLength: Infinity,
  url: 'https://api.deepseek.com/models',
  headers: { 
    'Accept': 'application/json', 
    'Authorization': 'Bearer sk-xxx'
  }
};

axios(config)
.then((response) => {
  console.log(JSON.stringify(response.data));
})
.catch((error) => {
  console.log(error);
});