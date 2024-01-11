import React, { useState } from 'react';
import ButtonSmall from './ButtonSmall';
import HeadingDiary from './HeadingDiary';
import SearchComponent from './SearchComponent';
import DailyTotals from './DailyTotals';
import LoggedFoods from './LoggedFoods';
import Footer from './Footer';

import styles from './Diary.module.css';

export default function Diary() {
    const [searchBarVis, setSearchBarVis] = useState(false);
    const [loggedFood, setLoggedFood] = useState([]);
    const [nutrientInfo, setNutrientInfo] = useState(null);

    const handleAddItem = () => {
        setSearchBarVis(!searchBarVis);
    };

    const handleLogFood = async () => {
        if (nutrientInfo) {
            // Use a promise to ensure the state is updated before calculating TotalCalories
            await new Promise((resolve) => {
                setLoggedFood((prevLoggedFood) => {
                    const updatedLoggedFood = [...prevLoggedFood, nutrientInfo];
                    resolve(updatedLoggedFood);
                    return updatedLoggedFood;
                });
            });
            setNutrientInfo(null); // Reset nutrientInfo after logging
        }
        setSearchBarVis(false); // Hide the search bar after logging the food
    };

    // Calculate TotalCalories after the state has been updated
    const TotalCalories = loggedFood.reduce((accumulator, currentObject) => {
        return accumulator + Number(currentObject.calories);
    }, 0);

    return (
        <div className={styles.pageContainer}>
            <div className={styles.mainContainer}>
                <HeadingDiary />
                <ButtonSmall handleButtonClick={handleAddItem} text="Add Food" />
                {searchBarVis && (
                    <>
                        <SearchComponent setNutrientInfo={setNutrientInfo} />
                        <ButtonSmall handleButtonClick={handleLogFood} text={"Log Food"} />
                    </>
                )}
                <LoggedFoods loggedFood={loggedFood} />
                <DailyTotals TotalCalories={TotalCalories} />
            </div>
            <Footer />
        </div>
    );
}
