import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DropDown from './DropDown';
import Button from './Button';

export default function CalorieTracker() {

  const [foodItems, setFoodItems] = useState([]);
  const [selectedFood, setSelectedFood] = useState('');
  const [dropDownVis, setDropDownVis] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const options = {
          method: 'GET',
          url: 'https://edamam-food-and-grocery-database.p.rapidapi.com/api/food-database/v2/parser',
          params: {
            'nutrition-type': 'cooking',
            'category[0]': 'generic-foods',
            'health[0]': 'alcohol-free'
          },
          headers: {
            'X-RapidAPI-Key': 'c599ac18a1msh64a053e19053943p1ae2cdjsn6bbb5560e96f',
            'X-RapidAPI-Host': 'edamam-food-and-grocery-database.p.rapidapi.com'
          }
        };

        const response = await axios.request(options);
        if (response.data.hints && response.data.hints.length > 0) {
          // Extracting food items from the response
          const items = response.data.hints.map((hint) => hint.food.label);
          setFoodItems(items);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const handleSelectChange = (event) => {
    setSelectedFood(event.target.value);
  };

  const handleAddItem = () => {
    setDropDownVis(true);
  }


  return (
    <div>
      <Button
        handleButtonClick={handleAddItem}
        text="Add a food item" />
      {dropDownVis && foodItems.length > 0 ? (
        <DropDown
          foodItems={foodItems}
          selectedFood={selectedFood}
          handleSelectChange={handleSelectChange}
        />
      ) : null}
      <p>Selected Food: {selectedFood.label}</p>
      {selectedFood && selectedFood.nutrients && selectedFood.nutrients.ENERC_KCAL !== undefined ? (
        <p>Cals: {selectedFood.nutrients.ENERC_KCAL}</p>
      ) : null}    
      </div>
  );
}
