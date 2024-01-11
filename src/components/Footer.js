import React from 'react'
import Navbar from './Navbar'
import styles from './Footer.module.css'


export default function Footer( { style }) {
    return (

        <div className={styles.footerContainer}>
            <Navbar />
        </div>

    )
}
