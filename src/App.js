
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Sidebar from './sidenavbar';
import Welcome from './Welcome';
import Home from './Home';

const App = () => {
  return (
    <Router>
      <div style={{ display: 'flex' }}>
        <Sidebar />
        <div style={{ marginLeft: '200px', padding: '20px' }}>
          <Routes>
            <Route path="/" element={<Welcome />} />
            <Route path="/Home" element={<Home />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;

