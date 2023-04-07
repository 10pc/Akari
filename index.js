import { GPT4All } from 'gpt4all';
import express from 'express';
import fetch from "node-fetch";

const app = express();
const port = 3000;


app.use('/', (req, res) => {
  express.static('public', '/index.html')
})

app.get('/translate', async (req, res) => {
  let text = req.query.txt;
  
  const resp = await fetch("https://translate.argosopentech.com/translate", {
	method: "POST",
	body: JSON.stringify({
		q: text,
		source: "en",
		target: "ja"
	}),
	headers: {
		"Content-Type": "application/json"}
	});
  const translated = await resp.json()
  res.send(translated.translatedText);
  
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

// I still have no idea if this works
// bin file is 4GB and I have limited data
async function chat(prompt) {
  const gpt4all = new GPT4All('gpt4all-lora-quantized', true);
  await gpt4all.init();
  await gpt4all.open();
  const response = await gpt4all.prompt(prompt);
  gpt4all.close();

  return response; // ?
}

console.log(chat("good morning"))