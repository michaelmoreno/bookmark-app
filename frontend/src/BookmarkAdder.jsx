import React, { useState } from 'react'

export default function BookmarkAdder(props) {
  const [ name, setName ] = useState('');

  const onNameChange = (event) => {
    const newName = event.target.value;

    setName(newName);
  }

  return (
    <div>
      <input type="text" class="name"/>
      <input type="text" className="site"/>
      <button id="Add">add</button>
    </div>    
  );
  
}
