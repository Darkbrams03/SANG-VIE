import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import AdminDash from './pages/AdminDash';
import AgentDash from './pages/AgentDash';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin" element={<AdminDash />} />
        <Route path="/agent" element={<AgentDash />} />
      </Routes>
    </Router>
  );
}

export default App;