import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import UserList from './Components/UserList';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<UserList />} />
        </Routes>

    </Router>
  );
}

export default App;
