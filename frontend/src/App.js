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
  <ColorModeContext.Provider value={colorMode}>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className="app">
        {/* <button onClick={() => setIsAdminView(!isAdminView)}>
            {isAdminView ? 'Switch to Student View' : 'Switch to Admin View'}
          </button> */}

          {/* {isAdminView ? <Admin /> : <Studentdash />} */}

        <Admin />
        {/* <Studentdash /> */}

        <main className="content">
        <Topbar />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/teacher" element={<Teacher />} />
          {/* <Route path="/student" element={<Student />} /> */}
          {/* <Route path="/contacts" element={<Contacts />} /> */}
          {/* <Route path="/invoices" element={<Invoices />} /> */}
          {/* <Route path="/form" element={<Form />} /> */}
          <Route path="/marks" element={<Marks />} />
        </Routes>
      </main>
    </div>
    </ThemeProvider>
  </ColorModeContext.Provider>
  );
}

export default App;
