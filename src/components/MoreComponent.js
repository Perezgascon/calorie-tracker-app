import React from 'react'
import styles from './MoreComponent.module.css'
import Footer from './Footer'

export default function MoreComponent() {
  return (
    <div>
      <div className={styles.mainContainer}>
        <h1>More Features Coming Soon!</h1>
      </div>
      <Footer />
    </div>
  )
}
