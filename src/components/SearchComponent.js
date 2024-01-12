// Inside SearchComponent.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';

import styles from './SearchComponent.module.css';

export default function SearchComponent({ setNutrientInfo }) {
    const [foodItems, setFoodItems] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedFood, setSelectedFood] = useState('');
    const [quantity, setQuantity] = useState(1);
    const [nutrientInfo, setNutrientInfoLocal] = useState({ calories: '' });

    useEffect(() => {
        const fetchFoodItems = async () => {
            if (!searchTerm) return;

            const apiUrl = 'https://api.edamam.com/api/food-database/v2/parser';
            const appId = process.env.REACT_APP_APP_ID;
            const appKey = process.env.REACT_APP_API_KEY;

            try {
                const response = await axios.get(`${apiUrl}?app_id=${appId}&app_key=${appKey}&ingr=${searchTerm}`);
                if (response.data && response.data.hints) {
                    setFoodItems(response.data.hints.map(hint => hint.food));
                    setSelectedFood(response.data.hints[0]?.food.foodId);
                }
            } catch (error) {
                console.error('Error fetching food items:', error);
            }
        };

        fetchFoodItems();
    }, [searchTerm]);

    useEffect(() => {
        // Update the nutrient information whenever quantity changes
        fetchData();
    }, [quantity]); // Run this effect when quantity changes

    useEffect(() => {
        // Update the nutrient information when a food item is selected
        if (selectedFood) {
            fetchData();
        }
    }, [selectedFood]); // Run this effect when selectedFood changes

    const fetchData = async () => {
        if (!selectedFood) return;

        const apiUrl = 'https://api.edamam.com/api/food-database/v2/nutrients';
        const appId = process.env.REACT_APP_APP_ID;
        const appKey = process.env.REACT_APP_API_KEY;
        const data = {
            ingredients: [
                {
                    quantity: quantity,
                    measureURI: 'http://www.edamam.com/ontologies/edamam.owl#Measure_unit',
                    foodId: selectedFood
                }
            ]
        };

        try {
            const result = await axios.post(`${apiUrl}?app_id=${appId}&app_key=${appKey}`, data);
            const nutrients = result.data.totalNutrients;
            const newNutrientInfo = {
                calories: nutrients.ENERC_KCAL?.quantity || 'N/A',
                fat: nutrients.FAT?.quantity || 'N/A',
                sugar: nutrients.SUGAR?.quantity || 'N/A',
                name: foodItems.find(item => item.foodId === selectedFood)?.label || ''
            };

            // Use the functional form to ensure the correct state update
            setNutrientInfoLocal(prevNutrientInfo => ({
                ...prevNutrientInfo,
                ...newNutrientInfo
            }));

            setNutrientInfo(prevNutrientInfo => ({
                ...prevNutrientInfo,
                ...newNutrientInfo
            }));
        } catch (error) {
            console.error('Error fetching data: ', error);

            // Use the functional form for resetting state in case of an error
            setNutrientInfoLocal(prevNutrientInfo => ({
                ...prevNutrientInfo,
                calories: '',
                fat: '',
                sugar: ''
            }));

            setNutrientInfo(prevNutrientInfo => ({
                ...prevNutrientInfo,
                calories: '',
                fat: '',
                sugar: ''
            }));
        }
    };

    const caloriesItem = nutrientInfo.calories !== 'N/A' ? nutrientInfo.calories * quantity : 'N/A';

    return (
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
                className={styles.inputField}
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
            />
            <div>
                <h2>Nutrient Information:</h2>
                <p>Calories: {caloriesItem}</p>
            </div>
        </div>
    );
}
