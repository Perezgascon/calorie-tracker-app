import React from 'react'
import styles from './Button.module.css'

export default function Button( { handleButtonClick, text }) {
  return (
    <button className={styles.button} onClick={handleButtonClick}>{text}</button>
  )
}

