export default class DataLayer {

  constructor(host, port) {
    this.hookUpdate = null;
    this.host = host;
    this.port = port;
  }

  makeUrl(uri) {
    return `http://${this.host}:${this.port}/${uri}`
  }

  apiFetch(ep, options) {
    const url = this.makeUrl(ep);
    return fetch(url, options);
  }

  async trigger() {
    const bookmarks = await this.all();
    this.hookUpdate(bookmarks);
  }

  async all(name, url) { // fetch all bookmarks
    var bookmarks = await this.apiFetch("all");
    return bookmarks;
  };

  async add(name, url) { // post to /add
    const bookmark = await this.apiFetch("add", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, url }),
    })
    this.trigger();
  };

  async delete(id) { // delete bookmark by id
    await this.apiFetch("delete", {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ id }),
    })
    this.trigger();
  }

  async update(id, name, url) {  // update bookmark by id
    const bookmark = this.apiFetch("update", {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id, name, url }),
    });
    this.trigger();
  }
}