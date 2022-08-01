import React from 'react'
import { useState,useEffect } from 'react'
import {BrowserRouter as Router,Routes,Route,Navigate} from 'react-router-dom'

//components
import Login from './components/Login';
import Signup from './components/Signup';
import Home from './components/HomePage/Home';

const App = () => {
  return (
    <Router>
          <Routes>
                <Route exact path="/" element={<Navigate to="/login" />} />
                <Route exact path="/login" element={<Login />} />
                <Route exact path="/signup" element={<Signup />}/>
                <Route exact path="/user/:id" element={<Home />} />
          </Routes>
    </Router>
  )
}

export default App