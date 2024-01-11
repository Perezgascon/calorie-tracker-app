import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Navbar.module.css'



export default function Navbar() {

    return (
        <div>
                <nav className={styles.navbar}>
                    <ul>
                        <li><Link to="/">Dashboard</Link></li>
                        <li><Link to="/diary">Diary</Link></li>
                        <li><Link to="/macros">Macros</Link></li>
                        <li><Link to="/bmi-calculator">BMI Calc</Link></li>
                        <li><Link to="/more">More</Link></li>
                    </ul>

                </nav >
        </div>

    )
}

