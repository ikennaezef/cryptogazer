import './App.css';

import React from 'react';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";

import {Home, Coin} from "./pages";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Home/>} />
        <Route exact path="/coin/:coinId" element={<Coin/>} />
      </Routes>
    </Router>
  );
}

export default App;
