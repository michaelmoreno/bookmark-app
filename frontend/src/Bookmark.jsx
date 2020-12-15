import React from 'react'

export default function Bookmark(props) {
  return (
    <form className="bookmark">
      <input type="text" value={props.Bookmark}/>
      <input type="text" value={props.DataLayer}/>
      <button type="submit"></button>
    </form>
  )
}
