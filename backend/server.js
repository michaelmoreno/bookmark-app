const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { Schema } = mongoose;


function setupDB(host, user, pw, db) {
  const url = `mongodb+srv://${user}:${pw}@${host}/${db}?retryWrites=true&w=majority`;
  mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, }, () => {
    console.log('DB Connected');
  })
  
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

const models = setupDB("cluster0.1vnil.mongodb.net", "michael", "dbpwd", "bookmarks");
const app = setupApp(3000);

app.get('/', (req, res) => {
  res.send('s')
})

app.post('/add', (req, res) => {
  console.log(req.body);
  res.json({ foo: "bar" });
})

app.delete('/remove', (req, res) => {
  res.send('remove');
})

app.put('/edit', (req, res) => {
  res.send('edit');
})
