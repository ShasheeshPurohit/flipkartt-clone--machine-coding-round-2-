import React from 'react';
import logo from './logo.svg';
import { Counter } from './features/counter/Counter';
import './App.css';
import {Routes, Route} from "react-router-dom";
import ProductListing from './Pages/ProductListing/ProductListing';
import Navbar from './Components/Navbar/Navbar';
import Cart from './Pages/Cart/Cart';

function App() {
  return (
    <div className="App">
      <Navbar/>
      <Routes>
        <Route path="/" element={<ProductListing/>}/>
        <Route path="/cart" element={<Cart/>}/>
      </Routes>
    </div>
  );
}

export default App;
