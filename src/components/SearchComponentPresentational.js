import React from 'react'

import styles from './SearchComponentPresentational.module.css';


export default function SearchComponentPresentational({
    foodItems,
    searchTerm,
    selectedFood,
    quantity,
    setSearchTerm,
    setSelectedFood,
    setQuantity,
    calculateTotalCalories,
    calculateTotalCarbs,
    calculateTotalProtein,
    calculateTotalFat
}) {
    return (
        <div>
            <div className={styles.mainContainer}>
                <input
                    className={styles.inputField}
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search for food..."
                />
                <select
                    className={styles.inputField}
                    value={selectedFood}
                    onChange={(e) => setSelectedFood(e.target.value)}
                >
                    {foodItems.map((item, index) => (
                        <option key={index} value={item.foodId}>
                            {item.label}
                        </option>
                    ))}
                </select>
                <input
                    className={styles.quantityField}
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(Number(e.target.value))}
                />
                <div className={styles.nutrientInfoContainer}>
                    <h2>Nutrient Information:</h2>
                    <p><strong>Calories</strong>: {calculateTotalCalories()}</p>
                    <p><strong>Carbs</strong>: {calculateTotalCarbs()}</p>
                    <p><strong>Protein</strong>: {calculateTotalProtein()}</p>
                    <p><strong>Fat</strong>: {calculateTotalFat()}</p>
                </div>
            </div>
        </div>
    )
}
