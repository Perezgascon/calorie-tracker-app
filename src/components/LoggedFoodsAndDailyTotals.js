import React from 'react'
import styles from './LoggedFoodsAndDailyTotals.module.css'

export default function LoggedFoodsAndDailyTotals ({ loggedFood, quantity, totalCalories }) {
    return (
        <div className={styles.mainContainer}>
            <h3>Logged Foods</h3>
            <div className={styles.loggedFoodContainer}>
                <ul>
                    {loggedFood.map((food, index) => (
                        <li key={index}>
                            {food.name} - Calories: {food.calories} - Quantity: {quantity}
                        </li>
                    ))}
                </ul>
            </div>
            <h3>Total Cals: {totalCalories}</h3>
        </div>
    )
}
