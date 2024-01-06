import React, { useState, useEffect } from 'react';
import axios from 'axios';

const MacroComponent = () => {
 const [macros, setMacros] = useState({});
 const [search, setSearch] = useState('');
 const [query, setQuery] = useState('chicken');

 const getMacros = async () => {
   const APP_ID = '26f8809f';
   const APP_KEY = '75c12f4b3a8702f8d588ead069857260';
   const response = await axios.get(`https://api.edamam.com/api/food-database/v2/nutrients?ingr=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`);
   setMacros(response.data);
 };

 useEffect(() => {
   getMacros();
 }, [query]);

 const handleSearch = (e) => {
   setSearch(e.target.value);
 };

 const handleSubmit = (e) => {
   e.preventDefault();
   setQuery(search);
   setSearch('');
 };

 return (
   <div>
     <form onSubmit={handleSubmit}>
       <input type="text" value={search} onChange={handleSearch} />
       <button type="submit">Search</button>
     </form>
     <h2>Macros for {query}</h2>
     <p>Calories: {macros.calories}</p>
     <p>Protein: {macros.protein}</p>
     <p>Fat: {macros.fat}</p>
     <p>Carbohydrates: {macros.carbs}</p>
   </div>
 );
};

export default MacroComponent;