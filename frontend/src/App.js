import React from 'react';
import { ColorModeContext, useMode } from './theme';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { Routes, Route } from "react-router-dom";
import Topbar from "./scenes/global/Topbar";
import Admin from "./scenes/global/Admin";
import Dashboard from "./scenes/dashboard";
import Teacher from "./scenes/teacher";
import Marks from "./scenes/marks";
// import Studentdash from "./scenes/global/Studentdash";
// import Student from "./scenes/student"
// import Invoices from "./scenes/invoices";
// import Contacts from "./scenes/contacts";
// import Form from "./scenes/form";

function App() {
  const [theme, colorMode] = useMode();
  // const [isAdminView, setIsAdminView] = useState(true);
  
  return (
      <div className="app">
        Hello World
      </div>
  );
}

export default App;
