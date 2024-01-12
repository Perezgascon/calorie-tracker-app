import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SearchComponentPresentational from './SearchComponentPresentational';

export default function SearchComponent({ setNutrientInfo }) {
    const [foodItems, setFoodItems] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedFood, setSelectedFood] = useState('');
    const [quantity, setQuantity] = useState(1);
    const [nutrientInfo, setNutrientInfoLocal] = useState({ calories: 0 });

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
        fetchData();
    }, [selectedFood]);

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
                calories: nutrients.ENERC_KCAL?.quantity || 0,
                name: foodItems.find(item => item.foodId === selectedFood)?.label || ''
            };

            setNutrientInfoLocal(newNutrientInfo);
            setNutrientInfo(newNutrientInfo);
        } catch (error) {
            console.error('Error fetching data: ', error);
            setNutrientInfoLocal(prevNutrientInfo => ({
                ...prevNutrientInfo,
                calories: 0
            }));
            setNutrientInfo(prevNutrientInfo => ({
                ...prevNutrientInfo,
                calories: 0
            }));
        }
    };

    const calculateTotalCalories = () => nutrientInfo.calories * quantity;

    return (
        <div>
            <SearchComponentPresentational
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                foodItems={foodItems}
                selectedFood={selectedFood}
                setSelectedFood={setSelectedFood}
                quantity={quantity}
                setQuantity={setQuantity}
                nutrientInfo={nutrientInfo}
                calculateTotalCalories={calculateTotalCalories}
            />
        </div>
    );
}
