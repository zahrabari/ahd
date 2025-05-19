import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import './App.css';

import Dashboard from './pages/Dashboard';
import Test from './pages/Test';
import Dashboardd from './pages/Dashboardd';
import Lrout from './pages/Reputation/Lrout'; // 👈 Le fichier qu'on vient de créer

function App() {
  return (
    <Router>
      <div className="main-content">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/dd" element={<Dashboardd />} />
          <Route path="/test" element={<Test />} />
        </Routes>

        {/* Appel des routes de réputation */}
        <Lrout />
      </div>
    </Router>
  );
}

export default App;
