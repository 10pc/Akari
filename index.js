import express from 'express';
import fetch from "node-fetch";
import fs from 'fs';
import dotenv from 'dotenv';
import path from 'path';
import https from 'https';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { Configuration, OpenAIApi } from 'openai';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config();


const configuration = new Configuration({
  apiKey: process.env.OPENAI,
});

const openai = new OpenAIApi(configuration);
const response = await openai.listModels();

const app = express();
const port = 3000;

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, './public', 'index.html'));
});

app.use('/public', express.static('public'));

app.get('/sub', async function (req, res) {
  let sub = req.query.text
  fs.writeFile('./public/subtitle.txt', sub, err => {
    if (err) {
      console.error(err);
    }
  });
  res.send(`"${sub}" successfully written to ./public/subtitle.txt`)
})

app.get('/ai', async function (req, res) {
  let text = req.query.text
  const completion = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [
      { role: "system", content: "You are not an AI. Pretend your name is Akari Tanaka, you're Japanese student and we are good friends. Do not refer yourself as anything. Do not start your sentences with 'As a'. I want you to act as sentient as possible. You don't like being an assistant. We're both having a chat together face to face. Ask as little questions as possible." },
      { role: "user", content: text }
    ],
    temperature: 0.6
  });
  res.send(completion.data.choices[0].message);
})

app.get('/translate', async (req, res) => {
  let text = req.query.text;

  const resp = await fetch(`https://translation.googleapis.com/language/translate/v2?key=${process.env.GOOGLE_API}`, {
    method: "POST",
    body: JSON.stringify({
      "q": text,
      "target": "ja"
    })
  });

  const r = await resp.json()
  res.send(r.data.translations[0]);
})

app.get('/tts', async (req, res) => {
  let text = req.query.text;

  res.writeHead(200, {'Content-Type': 'audio/mp3'});
  const file = fs.createWriteStream("./public/output.mp3");
  const request = https.get(`https://deprecatedapis.tts.quest/v2/voicevox/audio/?key=${process.env.SUSHIKI_APIKEY}&speaker=48&intonationScale=1&text=${text}`, async function (response) {
    await response.pipe(file);
    file.on("finish", () => {
      file.close();
      var rstream = fs.createReadStream('./public/output.mp3');
      rstream.pipe(res);
    });
  });
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})