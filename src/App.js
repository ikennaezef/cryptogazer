import './App.css';

import React from 'react';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";

import {Home, Coin} from "./pages";
import { Layout } from "./components";

const App = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route exact path="/" element={<Home/>} />
          <Route exact path="/coin/:coinId" element={<Coin/>} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
