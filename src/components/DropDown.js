import React from 'react';

const DropdownMenu = ({ foodItems, selectedFood, handleSelectChange }) => {
  return (
    <div>
      <label htmlFor="foodDropdown">Select a food item:</label>
      <select id="foodDropdown" value={selectedFood} onChange={handleSelectChange}>
        <option value="">Select...</option>
        {foodItems.map((foodItem, index) => (
          <option key={index} value={foodItem}>
            {foodItem}
          </option>
        ))}
      </select>
    </div>
  );
};

export default DropdownMenu;