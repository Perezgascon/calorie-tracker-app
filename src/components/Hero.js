import React from 'react'
import styles from './Hero.module.css'

export default function Hero({ style, Text1, Text2, Text3, Text4, Image1, Image2, Image3, Image4 }) {
  return (
    <div className={styles.mainContainer} style={style}>
      <div className={styles.quadrant}>
        <p className={styles.quadrantText}>{Text1}</p>
        <img className={styles.quadrantImage} src={Image1} alt='' />
      </div>
      <div className={styles.quadrant}>
        <p className={styles.quadrantText}>{Text2}</p>
        <img className={styles.quadrantImage} src={Image2} alt='' />
      </div>
      <div className={styles.quadrant}>
        <p className={styles.quadrantText}>{Text3}</p>
        <img className={styles.quadrantImage} src={Image3} alt='' />
      </div>
      <div className={styles.quadrant}>
        <p className={styles.quadrantText}>{Text4}</p>
        <img className={styles.quadrantImage} src={Image4} alt='' />
      </div>
    </div>
  )
}
