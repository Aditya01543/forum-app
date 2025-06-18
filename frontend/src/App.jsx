import React, { useEffect } from 'react';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import ProfilePage from './pages/ProfilePage';
import SignupPage from './pages/SignupPage';
import Navbar from './components/Navbar';

import { Routes, Route, Navigate } from "react-router-dom";
import { authManager } from './managers/authManager.js';
import { themeManager } from './managers/themeManager.js';
import { Toaster } from "react-hot-toast";

const App = () => {
  const {currentUser, checkauth} = authManager();
  const {theme} = themeManager();

  useEffect(() => {
    checkauth();
  }, [checkauth]);

  return (
    <div data-theme={theme}>
      <Navbar/>

      <Routes>
        <Route path="/" element={currentUser ? <HomePage/> : <Navigate to="/login" />} />
        <Route path="/signup" element={!currentUser ? <SignupPage/> : <Navigate to="/" />} />
        <Route path="/login" element={!currentUser ? <LoginPage/> : <Navigate to="/" />} />
        <Route path="/profile" element={currentUser ? <ProfilePage/> : <Navigate to="/login" />} />
      </Routes>

      <Toaster/>
      
    </div>
  )
}

export default App