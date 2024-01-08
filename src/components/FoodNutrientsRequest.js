import React, { useState, useEffect } from 'react';
import axios from 'axios';

const FoodNutrientsRequest = () => {
  const [foodItems, setFoodItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFood, setSelectedFood] = useState('');
  const [nutrientInfo, setNutrientInfo] = useState({ calories: '', fat: '', sugar: '' });

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

  const fetchData = async () => {
    if (!selectedFood) return;

    const apiUrl = 'https://api.edamam.com/api/food-database/v2/nutrients';
    const appId = process.env.REACT_APP_APP_ID;
    const appKey = process.env.REACT_APP_API_KEY;
    const data = {
      ingredients: [
        {
          quantity: 1,
          measureURI: 'http://www.edamam.com/ontologies/edamam.owl#Measure_unit',
          foodId: selectedFood
        }
      ]
    };

    try {
      const result = await axios.post(`${apiUrl}?app_id=${appId}&app_key=${appKey}`, data);
      const nutrients = result.data.totalNutrients;
      setNutrientInfo({
        calories: nutrients.ENERC_KCAL?.quantity || 'N/A',
        fat: nutrients.FAT?.quantity || 'N/A',
        sugar: nutrients.SUGAR?.quantity || 'N/A'
      });
    } catch (error) {
      console.error('Error fetching data: ', error);
      setNutrientInfo({ calories: '', fat: '', sugar: '' });
    }
  };

  return (
    <div>
      <input 
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search for food..."
      />
      <button onClick={fetchData}>Get Nutrients</button>
      <select value={selectedFood} onChange={(e) => setSelectedFood(e.target.value)}>
        {foodItems.map((item, index) => (
          <option key={index} value={item.foodId}>{item.label}</option>
        ))}
      </select>
      <div>
        <h2>Nutrient Information:</h2>
        <p>Calories: {nutrientInfo.calories}</p>
        <p>Fat: {nutrientInfo.fat}g</p>
        <p>Sugar: {nutrientInfo.sugar}g</p>
      </div>
    </div>
  );
};

export default FoodNutrientsRequest;
