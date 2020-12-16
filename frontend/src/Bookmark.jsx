import React, { useState } from 'react'
import DataLayer from './DataLayer'

export default function Bookmark({ data, api }) {
  // state hooks
  const [ name, setName ] = useState(data.name);
  const [ url, setUrl ] = useState(data.url);

  // user edited name text box
  const onNameChange = event => {
    const newName = event.target.value;
    // use name state hook
    setName(newName);
  };

  // user edited url text box
  const onUrlChange = event => {
    const newUrl = event.target.value;
    // use url state hook
    setUrl(newUrl);
  };

  // user pressed edit button
  const onUpdate = event =>  {
    event.preventDefault();
    // send new data to backend api
    api.update(data._id, name, url);
  };

  // user pressed delete button
  const onDelete = (event) => {
    event.preventDefault();
    // send deleted _id to backend api
    api.delete(data._id);
  }

  return (
      <div className="bookmark">
          <div className="field">
              <div>Name:</div>
              <input type="text" onChange={onNameChange} value={name}/>
          </div>
          <div className="field">
              <div>URL:</div>
              <input type="text" onChange={onUrlChange} value={url}/>
          </div>
        <div className="controls">
            <button onClick={onUpdate}>Update</button>
            <button onClick={onDelete}>Delete</button>
        </div>
    </div>
  )
}
