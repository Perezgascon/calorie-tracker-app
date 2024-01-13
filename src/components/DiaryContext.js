// DiaryContext.js
import React, { createContext, useContext, useState } from 'react';

const DiaryContext = createContext();

export const DiaryProvider = ({ children }) => {
  const [totalCarbs, setTotalCarbs] = useState(0);
  const [totalProtein, setTotalProtein] = useState(0);
  const [totalFat, setTotalFat] = useState(0);

  const updateTotals = (carbs, protein, fat) => {
    setTotalCarbs(carbs);
    setTotalProtein(protein);
    setTotalFat(fat);
  };

  return (
    <DiaryContext.Provider value={{ totalCarbs, totalProtein, totalFat, updateTotals }}>
      {children}
    </DiaryContext.Provider>
  );
};

export const useDiaryContext = () => {
  return useContext(DiaryContext);
};
