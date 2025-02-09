import https from "node:https";

let options = {
  'method': 'GET',
  'hostname': 'api.deepseek.com',
  'path': '/user/balance',
  'headers': {
    'Accept': 'application/json',
    'Authorization': 'Bearer sk-xxx'
  },
  'maxRedirects': 20
};

const req = https.request(options, (res) => {
  let chunks = [];

  res.on("data", (chunk) => {
    chunks.push(chunk);
  });

  res.on("end", (chunk) => {
    let body = Buffer.concat(chunks);
    console.log(body.toString());
  });

  res.on("error", (error) => {
    console.error(error);
  });
});

req.end();