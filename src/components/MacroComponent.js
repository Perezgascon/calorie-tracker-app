import React, { useState } from 'react';
import Table from './Table';
import { Doughnut } from 'react-chartjs-2';
import Footer from './Footer'

import styles from './MacroComponent.module.css';

import { Chart, ArcElement } from 'chart.js'
Chart.register(ArcElement);


const MacroComponent = ({ totalCarbs, totalProtein, totalFat }) => {
  const dailyCarbs = 20
  const dailyFats = 20
  const dailyProteins = 60

  const [chartData, setChartData] = useState({
    labels: ['Carbohydrates', 'Fat', 'Protein'],
    datasets: [
      {
        data: [dailyCarbs, dailyProteins, dailyFats], // Initial values, you can modify these as needed
        backgroundColor: ['#3498db', '#f39c12', '#e74c3c'], // Customize colors as needed
      },
    ],
  });

  return (
    <div>
      <div className={styles.mainContainer}>
        <h1>Your Daily Macros</h1>
        <div className={styles.pieChart}>
          <Doughnut data={chartData} />
        </div>
        <div className={styles.table}>
          <Table />
        </div>
      </div>
      <div className={styles.footer}>
        <Footer />
      </div>
    </div>
  );
};

export default MacroComponent;