import React, { useState } from 'react';
import Bookmark from './Bookmark';
import DataLayer from './DataLayer';
import BookmarkAdder from './BookmarkAdder';

const dataLayer = new DataLayer("localhost", "3000");

function App() {
  const [bookmarks, setBookmarks] = useState(null);

  dataLayer.hookUpdate = setBookmarks;

  const bookmarkElements = [];

  if (bookmarks != null) {
    for (let bookmark of bookmarks) {
      const ele = <Bookmark data={bookmark} api={dataLayer} key={bookmark._id} />;
      bookmarkElements.push(ele);
    }
  } else {
    dataLayer.all().then(setBookmarks);
  }

  const addBKMK = () => {
    DataLayer.add();
  }

  return (
    <div className="App">
      <h1>Add a new bookmark</h1> 
      <BookmarkAdder api={dataLayer}/>
      <hr />
      <div id="bookmarks">
        <h1>Your Bookmarks</h1>
        {bookmarkElements}
      </div>
    </div>
  );
}

export default App;
