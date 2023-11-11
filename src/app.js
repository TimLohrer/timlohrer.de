require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();

app.use(express.static(path.join(__dirname, 'public')));
app.use(cors({ origin: [process.env.URL] }));
app.use(express.json());

const buildPage = require('./utils/buildPage');

// delete require.cache[require.resolve('./data/en/content.index.json')];
// delete require.cache[require.resolve('./data/de/content.index.json')];
const en = require('./data/en/content.index.json');
const de = require('./data/de/content.index.json');

app.get('/', async (req, res) => {
    const content = JSON.stringify({ en: en, de: de })
    res.send(buildPage('index', 'content', content));
})

app.get('/.well-known/discord', (req, res) => {
    res.sendFile(__dirname + '/public/discord.html');
});

app.listen(process.env.PORT, () => {
    console.log(`Now online on port ${process.env.PORT}`);
});