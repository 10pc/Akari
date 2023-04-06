import { GPT4All } from 'gpt4all';
import express from 'express';
const app = express();
const port = 3000;
app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

// I still have no idea if this works
// bin file is 4GB and I have limited data
async function chat(prompt) {
  const gpt4all = new GPT4All('gpt4all-lora-unfiltered-quantized', true);
  await gpt4all.init();
  await gpt4all.open();
  const response = await gpt4all.prompt(prompt);
  gpt4all.close();

  return response; // ?
}

