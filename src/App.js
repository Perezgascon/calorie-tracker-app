import React from 'react'
import {
  BrowserRouter,
  Routes, // instead of "Switch"
  Route,
} from "react-router-dom";
import Dashboard from './components/Dashboard'
import MacroComponent from './components/MacroComponent'
import Diary from './components/Diary'
import BmiCalculator from './components/BmiCalculator';
import MoreComponent from './components/MoreComponent'

import './App.css';


export default function App() {
  return (

    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/diary" element={<Diary />} />
      <Route path="/macros" element={<MacroComponent />} />
      <Route path="/bmi-calculator" element={<BmiCalculator />} />
      <Route path="/more" element={<MoreComponent />} />
    </Routes>
  </BrowserRouter>
);
}
