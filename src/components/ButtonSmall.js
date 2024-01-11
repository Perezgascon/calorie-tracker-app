import React from 'react'
import styles from './ButtonSmall.module.css'

export default function SmallButton( {handleButtonClick, text }) {
  return (
    <div>
      <button className={styles.button} onClick={handleButtonClick}>{text}</button>
    </div>
  )
}
