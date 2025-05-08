import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import UserListPage from './pages/UserListPage';
import CreateUserPage from './pages/CreateUserPage';
import EditUserPage from './pages/EditUserPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<UserListPage />} />
        <Route path="/create" element={<CreateUserPage />} />
        <Route path="/edit/:id" element={<EditUserPage />} />
      </Routes>
    </Router>
  );
}

export default App;


