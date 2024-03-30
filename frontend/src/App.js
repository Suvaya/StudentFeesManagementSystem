import React from 'react';
import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from "./components/Header";
import Teachers from './pages/Teachers';
import AddUserForm from "./components/AddUserForm";
import EditUserForm from "./components/EditUserForm";
import SignIn from "./components/SignIn";
import { AuthProvider } from "./contexts/AuthContext";
import ProtectedRoute from "./route/ProtectedRoute";
import Users from "./components/User";
import Students from "./pages/Students";
import People from "./components/People";
import StudInfo from "./components/StudInfo";
import TeachInfo from "./components/TeachInfo";
import Home from "./pages/Home";

function App() {
  return (
      <AuthProvider>
        <Router>
            <div>
                <Header />
            </div>
            <Routes>
                <Route path="/" element={<Home/>} />
                <Route path="/users" element={<ProtectedRoute><Users /></ProtectedRoute>} />
                <Route path="/students" element={<ProtectedRoute><Students /></ProtectedRoute>} />
                <Route path="/teachers" element={<ProtectedRoute><Teachers /></ProtectedRoute>} />
                <Route path="/add-user" element={<ProtectedRoute><AddUserForm /></ProtectedRoute>} />
                <Route path="/studinfo" element={<ProtectedRoute><StudInfo /></ProtectedRoute>} />
                <Route path="/teachinfo" element={<ProtectedRoute><TeachInfo /></ProtectedRoute>} />
                <Route path="/edit-user/:userId" element={<ProtectedRoute><EditUserForm /></ProtectedRoute>} />
                <Route path="/people" element={<People />} />
                <Route path="/signin" element={<SignIn />} />
            </Routes>
        </Router>
      </AuthProvider>
  );
}

export default App;
