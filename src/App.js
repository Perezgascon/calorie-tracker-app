// App.js
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { DiaryProvider } from './components/DiaryContext'; // Import the DiaryProvider

import Dashboard from './components/Dashboard';
import MacroComponent from './components/MacroComponent';
import Diary from './components/Diary';
import BmiCalculator from './components/BmiCalculator';
import MoreComponent from './components/MoreComponent';

import './App.css';

export default function App() {
  return (
    <DiaryProvider> {/* Wrap your components with DiaryProvider */}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/diary" element={<Diary />} />
          <Route path="/macros" element={<MacroComponent />} />
          <Route path="/bmi-calculator" element={<BmiCalculator />} />
          <Route path="/more" element={<MoreComponent />} />
        </Routes>
      </BrowserRouter>
    </DiaryProvider>
  );
}
