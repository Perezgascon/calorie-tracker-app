import React from 'react'
import styles from './Header.module.css'

export default function Header() {
  return (
    <div className={styles.headingsContainer}>
        <h2 className={styles.mainHeading}>MealMate</h2>
        <p className={styles.tagLine}>Your Nutrition and Health Companion</p>
    </div>
  )
}
