import React from 'react'
import styles from './Table.module.css'

export default function Table( { totalCarbs, totalFat, totalProtein}) {
  return (
    <div><div>
    <table className={styles.table}>
      <thead>
        <tr>
          <th></th>
          <th>Total</th>
          <th>Goal</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>
            <div className={`${styles.squareIcon} ${styles.blueSquare}`}></div> Carbs (g)
          </td>
          <td> {totalCarbs} </td>
          <td></td>
        </tr>
        <tr>
          <td>
            <div className={`${styles.squareIcon} ${styles.orangeSquare}`}></div> Fat (g)
          </td>
          <td>{totalFat}</td>
          <td></td>
        </tr>
        <tr>
          <td>
            <div className={`${styles.squareIcon} ${styles.redSquare}`}></div> Protein (g)
          </td>
          <td>{totalProtein}</td>
          <td></td>
        </tr>
      </tbody>
    </table>
  </div></div>
  )
}
