import React from 'react';
import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Header from "./components/Header";
import Teachers from './pages/Teachers';
import Students from './pages/Students';
import AddUserForm from "./components/AddUserForm";
import EditUserForm from "./components/EditUserForm";
import SignIn from "./components/SignIn";
import { AuthProvider } from "./contexts/AuthContext";
import ProtectedRoute from "./route/ProtectedRoute";

function App() {
  return (
      <AuthProvider>
        <Router>
            <div>
                <Header />
            </div>
            <Routes>
                <Route path="/students" element={<ProtectedRoute><Students /></ProtectedRoute>} />
                <Route path="/teachers" element={<ProtectedRoute><Teachers /></ProtectedRoute>} />
                <Route path="/add-user" element={<ProtectedRoute><AddUserForm /></ProtectedRoute>} />
                <Route path="/edit-user/:userId" element={<ProtectedRoute><EditUserForm /></ProtectedRoute>} />
                <Route path="/signin" element={<SignIn />} />
            </Routes>
        </Router>
      </AuthProvider>
  );
}

export default App;
