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
import LogIn from "./components/Login";
function App() {
  return (
      <Router>
          <div>
              <Header />
          </div>
          <Routes>
              <Route path="/students" element={<Students />} />
              <Route path="/add-user" element={<AddUserForm />} />
              <Route path="/edit-user/:userId" element={<EditUserForm />} />
              <Route path="/signin" element={<LogIn />} />
              <Route path="/teachers" component={Teachers} />
              <Route path="/students" component={Students} />

          </Routes>
      </Router>
  );
}

export default App;
