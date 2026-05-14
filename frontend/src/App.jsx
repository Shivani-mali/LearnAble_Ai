import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Preferences from './pages/Preferences';
import StudentHome from './pages/StudentHome';
import Learning from './pages/Learning';
import ParentDashboard from './pages/ParentDashboard';
import './App.css';
import './index.css';

function App() {
  return (
    <Router>
      <div className="app-container">
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/preferences" element={<Preferences />} />
          <Route path="/student-home" element={<StudentHome />} />
          <Route path="/learning" element={<Learning />} />
          <Route path="/parent-dashboard" element={<ParentDashboard />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
