import React from 'react'
import styles from './LoggedFoodsAndDailyTotals.module.css'

export default function LoggedFoodsAndDailyTotals ({ loggedFood, quantity, totalCalories, totalCarbs, totalProtein, totalFat }) {
    return (
        <div className={styles.mainContainer}>
            <h2>Logged Foods</h2>
            <div className={styles.loggedFoodContainer}>
                <ul>
                    {loggedFood.map((food, index) => (
                        <li key={index}>
                            {food.name} - Calories: {food.calories} - Quantity: {quantity}
                        </li>
                    ))}
                </ul>
            </div>
            <h2>Today's Nutrient Intake</h2>
            <h3>Total Cals: {totalCalories}</h3>
            <h3>Total Carbs: {totalCarbs}</h3>
            <h3>Total Protein: {totalProtein}</h3>
            <h3>Total Fat: {totalFat}</h3>
        </div>
    )
}
