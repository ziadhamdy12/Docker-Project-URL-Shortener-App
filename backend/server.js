const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const shortid = require('shortid');

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://db:27017/urlshortener')
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

const urlSchema = new mongoose.Schema({
  originalUrl: String,
  shortCode: String,
  clicks: {
    type: Number,
    default: 0
  }
});

const Url = mongoose.model('Url', urlSchema);

app.get('/', (req, res) => {
  res.send('API Running');
});

app.post('/shorten', async (req, res) => {

  const { url } = req.body;

  const shortCode = shortid.generate();

  const newUrl = new Url({
    originalUrl: url,
    shortCode
  });

  await newUrl.save();

  res.json({
    shortUrl: `http://localhost:5000/${shortCode}`
  });
});

app.get('/:code', async (req, res) => {

  const url = await Url.findOne({
    shortCode: req.params.code
  });

  if (!url) {
    return res.status(404).send('URL not found');
  }

  url.clicks += 1;

  await url.save();

  res.redirect(url.originalUrl);
});

app.listen(5000, '0.0.0.0', () => {
  console.log('Server running on port 5000');
});