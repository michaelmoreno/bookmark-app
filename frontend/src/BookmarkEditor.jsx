import React, { useState } from 'react'

export default function BookmarkEditor(props) {
  const [ name, setName ] = useState('');

  const onNameChange = (event) => {
    const newName = event.target.value;

    setName(newName);
  }
}
