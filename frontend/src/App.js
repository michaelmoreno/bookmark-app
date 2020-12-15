import React, { useState } from 'react';
import Bookmark from './Bookmark';
import DataLayer from './DataLayer';


const dataLayer = new DataLayer("http://localhost:3000/");

function App() {
  const [bookmarks, setBookmarks] = useState(null);

  dataLayer.hookUpdate = setBookmarks;

  const bookmarkElements = [];

  if (bookmarks != null) {
    for (let bookmark of bookmarks) {
      const ele = <Bookmark data={bookmark} api={dataLayer} />;
      bookmarkElements.push(ele);
    }
  }

  return (
    <div className="App">
      <form action="/add" method="post">
        <h2>Add new bookmark</h2>
        <input type="text" id="name" placeholder="Name"/>
        <input type="text" id="url" placeholder="http://website.domain"/>
        <button type="submit" id="add">Add</button>
      </form>
      <div id="bookmarks">
        {bookmarkElements}
      </div>
    </div>
  );
}

export default App;
