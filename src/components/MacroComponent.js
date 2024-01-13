// MacroComponent.js
import React from 'react';
import { useDiaryContext } from './DiaryContext';
import Table from './Table';
import { Doughnut } from 'react-chartjs-2';
import Footer from './Footer';

import styles from './MacroComponent.module.css';

import { Chart, ArcElement } from 'chart.js'
Chart.register(ArcElement);

const MacroComponent = () => {
  const { totalCarbs, totalProtein, totalFat } = useDiaryContext();
  const totalCalories = totalCarbs * 4 + totalProtein * 4 + totalFat * 9;

  // Calculate percentages
  const carbPercentage = (totalCarbs * 4 / totalCalories) * 100;
  const proteinPercentage = (totalProtein * 4 / totalCalories) * 100;
  const fatPercentage = (totalFat * 9 / totalCalories) * 100;

  const chartData = {
    labels: ['Carbohydrates', 'Fat', 'Protein'],
    datasets: [
      {
        data: [carbPercentage, proteinPercentage, fatPercentage], // Initial values, you can modify these as needed
        backgroundColor: ['#3498db', '#f39c12', '#e74c3c'], // Customize colors as needed
      },
    ],
  };

  return (
    <div>
      <div className={styles.mainContainer}>
        <h1>Your Daily Macros</h1>
        <div className={styles.pieChart}>
          <Doughnut data={chartData} />
        </div>
        <div className={styles.table}>
          <Table
            totalCarbs={totalCarbs}
            totalProtein={totalProtein}
            totalFat={totalFat} />
        </div>
      </div>
      <div className={styles.footer}>
        <Footer />
      </div>
    </div>
  );
};

export default MacroComponent;
