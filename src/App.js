import './App.css';

import {useState} from 'react';
import {BrowserRouter as Router, Routes, Route, Link} from "react-router-dom";

import {Home, Coin} from "./pages";

function App() {

  const [currentSlide, setCurrentSlide] = useState(0);

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
