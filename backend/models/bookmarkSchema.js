const mongoose = require('mongoose');
const { Schema } = mongoose; 

const bookmarkSchema = new Schema({
  name: { type: String, required: true },
  url: { type: String, required: true }
})

const Bookmark = mongoose.model('Bookmark', bookmarkSchema);

class DataLayer {
  constructor(hookUpdate, dburi, dbuser, dbpwd, dbcoll) {
    this.hookUpdate = hookUpdate;
    this.db = this.connect(dbuser, dbpwd, dburi, dbcoll); 

  }
  connect(dbuser, dbpwd, dburi, dbcoll) {
    const url = `mongodb+srv://${dbuser}:${dbpwd}@${dburi}/${dbcoll}?retryWrites=true&w=majority`;
    mongoose.connect(url);
    return mongoose.connection;
  }

  async update() {
    const allBookmarks = await this.queryBookmarks()
    this.hookUpdate(allBookmarks);
  }
  
  async addBookmark(name, url) {
    const newBookmark = new Bookmark({
      name,
      url,
    })
    await newBookmark.save();
    const allBookmarks = await this.queryBookmarks()
    this.hookUpdate(allBookmarks);
    return newBookmark;
  }
  queryBookmarks() {
    Bookmark.find({})
  }
};
k