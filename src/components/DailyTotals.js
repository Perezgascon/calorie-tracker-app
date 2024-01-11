import React from 'react'
import styles from './DailyTotals.module.css'

export default function DailyTotals( { TotalCalories }) {
  return (
    <div className={styles.mainContainer}>
        <h3>Total Cals: {TotalCalories}</h3>
    </div>
  )
}
