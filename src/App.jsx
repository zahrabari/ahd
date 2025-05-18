import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import './App.css';

import  Dashboard from './pages/Dashboard';
import Test from './pages/Test'
import Dashboardd from './pages/Dashboardd';
import Overview from './pages/Reputation/Overview';
import Reviews from './pages/Reputation/Reviews';
import Requests from './pages/Reputation/Requests';
import  Widget from './pages/Reputation/Widget';
import Settings from './pages/Reputation/set/Settings';
import Whatsapp from './pages/Reputation/set/Whatsapp';
import Review from './pages/Reputation/set/Review';
import Samp from './pages/Reputation/set/Samp';
import Smss from './pages/Reputation/set/Smss';
import Reviewlink from './pages/Reputation/set/Reviewlink';
import EmailRev from './pages/Reputation/set/EmailRev';
import Integrations from './pages/Reputation/set/Integrations';
import List from './pages/Reputation/List';

function App() {
  return (
    <Router>
      
        {/* Sidebar */}
       

        {/* Main Content */}
        <div className="main-content">
          <Routes>
           
            <Route path="/" element={<Dashboard/>} />
           
            <Route path="/dd" element={<Dashboardd/>} />
            <Route path="/test" element={<Test/>} />
            <Route path="/Ov" element={<Overview/>} />
            <Route path="/re" element={<Requests   />} />
            <Route path="/rev" element={<Reviews   />} />
            <Route path="/w" element={< Widget   />} />
            <Route path="/s" element={< Settings   />} />
            <Route path="/h" element={< Whatsapp   />} />
            <Route path="/r" element={< Review />} />
            <Route path="/p" element={< Samp />} />
            <Route path="/m" element={< Smss />} />
            <Route path="/l" element={< Reviewlink />} />
            <Route path="/e" element={< EmailRev />} />
            <Route path="/i"   element={<Integrations/>}/>
            <Route path="/list" element={<List/>}/>
            

          </Routes>
        </div>
      
    </Router>
  );
}

export default App;