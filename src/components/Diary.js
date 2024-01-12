// Diary.js
import React, { useState } from 'react';
import ButtonSmall from './ButtonSmall';
import HeadingDiary from './HeadingDiary';
import SearchComponent from './SearchComponent';
import LoggedFoodsAndDailyTotals from './LoggedFoodsAndDailyTotals';
import Footer from './Footer';

import styles from './Diary.module.css';

export default function Diary() {
    const [searchBarVis, setSearchBarVis] = useState(false);
    const [loggedFood, setLoggedFood] = useState([]);
    const [nutrientInfo, setNutrientInfo] = useState(null);
    const [quantity, setQuantity] = useState(1);

    const handleAddItem = () => {
        setSearchBarVis(!searchBarVis);
    };

    const handleLogFood = (logQuantity) => {
        if (nutrientInfo) {
            const loggedFoodItem = {
                ...nutrientInfo,
                quantity: logQuantity
            };

            setLoggedFood((prevLoggedFood) => [...prevLoggedFood, loggedFoodItem]);
            setNutrientInfo(null); // Reset nutrientInfo after logging
        }
        setSearchBarVis(false); // Hide the search bar after logging the food
    };

    // Calculate TotalCalories after the state has been updated
    const totalCalories = loggedFood.reduce((accumulator, currentObject) => {
        return accumulator + Number(currentObject.calories) * currentObject.quantity;
    }, 0);

    const totalCarbs = loggedFood.reduce((accumulator, currentObject) => {
        return accumulator + Number(currentObject.carbs) * currentObject.quantity;
    }, 0);

    const totalProtein = loggedFood.reduce((accumulator, currentObject) => {
        return accumulator + Number(currentObject.protein) * currentObject.quantity;
    }, 0);

    const totalFat = loggedFood.reduce((accumulator, currentObject) => {
        return accumulator + Number(currentObject.fat) * currentObject.quantity;
    }, 0);

    return (
        <div className={styles.pageContainer}>
            <div className={styles.mainContainer}>
                <HeadingDiary />
                <ButtonSmall handleButtonClick={handleAddItem} text="Add Food" />
                {searchBarVis && (
                    <>
                        <SearchComponent setNutrientInfo={setNutrientInfo} setQuantity={setQuantity} />
                        <ButtonSmall handleButtonClick={() => handleLogFood(quantity)} text={"Log Food"} />
                    </>
                )}
                <LoggedFoodsAndDailyTotals
                    loggedFood={loggedFood}
                    quantity={quantity}
                    totalCalories={totalCalories}
                    totalCarbs={totalCarbs}
                    totalProtein={totalProtein}
                    totalFat={totalFat} />
            </div>
            <div className={styles.footer}>
                <Footer />
            </div>
        </div>
    );
}
