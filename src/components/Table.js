import React from 'react'
import styles from './Table.module.css'

export default function Table() {
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
            <div className={`${styles.squareIcon} ${styles.blueSquare}`}></div> Carbohydrates (<span></span>g)
          </td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <td>
            <div className={`${styles.squareIcon} ${styles.orangeSquare}`}></div> Fat (<span></span>g)
          </td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <td>
            <div className={`${styles.squareIcon} ${styles.redSquare}`}></div> Protein (<span></span>g)
          </td>
          <td></td>
          <td></td>
        </tr>
      </tbody>
    </table>
  </div></div>
  )
}
