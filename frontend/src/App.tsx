import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Routes, Route } from 'react-router-dom';
import Signup from './pages/signup/Signup';
import Login from './pages/login/Login';
import './App.css';
import Home from './pages/home/Home';

function App() {
  return (
    <Router>
      <div>
        <section>
          <Routes>
            <Route path="/signup" element={<Signup />} />
            <Route path="/" element={<Login />} />
            <Route path="/home" element={<Home />}/>
          </Routes>
        </section>
      </div>
    </Router>
  )
}
export default App;
