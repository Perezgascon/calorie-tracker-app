import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DropDown from './DropDown';
import Button from './Button';

export default function CalorieTracker() {

  const [foodItems, setFoodItems] = useState([]);
  const [selectedFood, setSelectedFood] = useState('');
  const [dropDownVis, setDropDownVis] = useState(false);
  const [nutritionalInfo, setNutritionalInfo] = useState(null);

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
          const items = response.data.hints.map((hint) => ({
            label: hint.food.label,
            id: hint.food.foodId
          }));
          setFoodItems(items);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const fetchNutritionalData = async (foodId) => {
    const YOUR_APP_ID = 'b73add09'; 
    const YOUR_APP_KEY = '3ec7cd9d14297f9ae975692179b8a548'; 

    try {
      const response = await axios.post('https://api.edamam.com/api/food-database/v2/nutrients', {
        headers: {
          'Content-Type': 'application/json',
          'Edamam-App-Id': YOUR_APP_ID,
          'Edamam-App-Key': YOUR_APP_KEY
        },
        data: {
          ingredients: [
            {
              quantity: 1,
              measureURI: 'http://www.edamam.com/ontologies/edamam.owl#Measure_unit',
              foodId: foodId
            }
          ]
        }
      });

      setNutritionalInfo(response.data);
    } catch (error) {
      console.error('Error fetching nutritional data:', error);
    }
  };

  const handleSelectChange = (event) => {
    const selectedLabel = event.target.value;
    const selected = foodItems.find(item => item.label === selectedLabel);
    setSelectedFood(selected);
    fetchNutritionalData(selected.id);
  };

  const handleAddItem = () => {
    setDropDownVis(true);
  };

  return (
    <div>
      <Button
        handleButtonClick={handleAddItem}
        text="Add a food item" />
      {dropDownVis && foodItems.length > 0 && (
        <DropDown
          foodItems={foodItems}
          selectedFood={selectedFood.label} 
          handleSelectChange={handleSelectChange}
        />
      )}
      {selectedFood.label && <p>Selected Food: {selectedFood.label}</p>}
      {nutritionalInfo && (
        <div>
          <h3>Nutritional Information:</h3>
          {/* Example rendering of calories, modify as needed for other nutrients */}
          <p>Calories: {nutritionalInfo.calories}</p>
          {/* Render more nutritional data here */}
        </div>
      )}
    </div>
  );
}
