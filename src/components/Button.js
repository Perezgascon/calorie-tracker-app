import React from 'react'

export default function Button( { handleButtonClick, text }) {
  return (
    <button onClick={handleButtonClick}>{text}</button>
  )
}
