import React, { useState } from 'react'
import DataLayer from './DataLayer'

export default function BookmarkAdder({ api }) {
  const [ name, setName ] = useState('');
  const [ url, setUrl ] = useState('');
  
  const onNameChange = (event) => {
    const newName = event.target.value;
    setName(newName);

  }

  const onUrlChange = (event) => {
    const newUrl = event.target.value;
    setUrl(newUrl);
  }

  const onAdd = () => {
    api.add(name, url);
  }

  return (
      <div className="bookmark">
          <div className="field">
              <div>Name:</div>
              <input type="text" className="name" onChange={onNameChange} value={name}/>
          </div>
          <div className="field">
              <div>URL:</div>
              <input type="text" className="url" onChange={onUrlChange} value={url}/>
          </div>
          <div className="controls">
              <button onClick={onAdd}id="Add">add</button>
          </div>
    </div>
  );
}
