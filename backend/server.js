const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { Schema } = mongoose;


function setupDB(host, user, pw, dbname) {
  const url = `mongodb+srv://${user}:${pw}@${host}/${dbname}?retryWrites=true&w=majority`;
  mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, })

  const db = mongoose.connection;
  db.on('open', () => console.log(`DB Connected: ${url}`));
  db.on('error', console.error.bind(console, 'Connection error.'));
  
  const bookmarkSchema = new Schema({
    name: { type: String, required: true },
    url: { type: String, required: true }
  })
  
  const Bookmark = mongoose.model('Bookmark', bookmarkSchema);
  return { Bookmark };
}

function setupApp(port) {
    const app = express();

  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());

  app.listen(port, () => console.log(`listening on ${port}`))
  return app;
}

const models = setupDB("cluster0.lvnil.mongodb.net", "michael", "dbpwd", "bookmarks");
const app = setupApp(3000);

app.get('/all', (req, res) => {
  const bookmarks = models.Bookmark.find({});
  res.json(bookmarks);
})

app.post('/add', async (req, res) => {
  const name = req.body.name;
  const url = req.body.url;
  const bookmark = new models.Bookmark({ name, url });
  await bookmark.save();
  res.json(bookmark)
})

app.delete('/rem', (req, res) => {
  res.send('remove');
})

app.put('/edit', (req, res) => {
  const id = req.body.id;
  const name = req.body.name;
  const url = req.body.url;
  const bookmark = models.Bookmark.f
})
