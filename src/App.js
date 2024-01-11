import React from 'react'
import {
  BrowserRouter,
  Routes, // instead of "Switch"
  Route,
} from "react-router-dom";
import CalorieTracker from './components/CalorieTracker'
import DropDown from './components/DropDown'
import Dashboard from './components/Dashboard'
import MacroComponent from './components/MacroComponent'
import Diary from './components/Diary'
import SearchComponent from './components/SearchComponent';

import './App.css';


export default function App() {
  return (

    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/diary" element={<Diary />} />
    </Routes>
  </BrowserRouter>
);
}
