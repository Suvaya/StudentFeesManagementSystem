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
function App() {
  return (
      <AuthProvider>
        <Router>
            <div>
                <Header />
            </div>
            <Routes>
                <Route path="/students" element={<Students />} />
                <Route path="/teachers" element={<Teachers />} />
                <Route path="/add-user" element={<AddUserForm />} />
                <Route path="/edit-user/:userId" element={<EditUserForm />} />
                {/*<Route path="/admin" element={<Login />} /> */}
                <Route path="/signin" element={<SignIn />} /> {/* Add this line */}
            </Routes>
        </Router>
      </AuthProvider>
  );
}

export default App;
