import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Teachers from "./pages/Teachers";
import AddUserForm from "./components/AddUserForm";
import EditUserForm from "./components/EditUserForm";
import SignIn from "./components/SignIn";
import RoleProtectedRoute from "./route/RoleProtectedRoute"; 
import Users from "./components/User";
import Students from "./pages/Students";
import People from "./components/People";
import StudInfo from "./components/StudInfo";
import TeachInfo from "./components/TeachInfo";
import Sidebar from "./components/Sidebar";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";

function App() {
  const { isLoggedIn, role } = useAuth();

  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <div>
            {isLoggedIn && (role === "student" || role === "teacher" || role === "admin") && <Sidebar />}
          </div>
          <Routes>
            <Route 
              path="/" 
              element={isLoggedIn ? 
                (role === "teacher" ? <Navigate to="/teachinfo" /> : 
                role === "student" ? <Navigate to="/studinfo" /> :
                role === "admin" ? <Navigate to="/users" /> : <Home />)
                : <Home />
              }
            />
            <Route
              path="/users"
              element={
                <RoleProtectedRoute allowedRoles={["admin"]}>
                  <Users />
                </RoleProtectedRoute>
              }
            />
            <Route
              path="/students"
              element={
                <RoleProtectedRoute allowedRoles={["teacher"]}>
                  <Students />
                </RoleProtectedRoute>
              }
            />
            <Route
              path="/teachers"
              element={
                <RoleProtectedRoute allowedRoles={["admin"]}>
                  <Teachers />
                </RoleProtectedRoute>
              }
            />
            <Route
              path="/add-user"
              element={
                <RoleProtectedRoute allowedRoles={["admin"]}>
                  <AddUserForm />
                </RoleProtectedRoute>
              }
            />
            <Route
              path="/studinfo"
              element={
                <RoleProtectedRoute allowedRoles={["student"]}>
                  <StudInfo />
                </RoleProtectedRoute>
              }
            />
            <Route
              path="/teachinfo"
              element={
                <RoleProtectedRoute allowedRoles={["teacher"]}>
                  <TeachInfo />
                </RoleProtectedRoute>
              }
            />
            <Route
              path="/edit-user/:userId"
              element={
                <RoleProtectedRoute allowedRoles={["admin"]}>
                  <EditUserForm />
                </RoleProtectedRoute>
              }
            />
            <Route
              path="/people"
              element={
                <RoleProtectedRoute allowedRoles={["admin"]}>
                  <People />
                </RoleProtectedRoute>
              }
            />
            <Route path="/signin" element={<SignIn />} />
          </Routes>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
