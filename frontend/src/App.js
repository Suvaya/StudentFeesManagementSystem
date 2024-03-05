import { ColorModeContext, useMode } from './theme';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { Routes, Route } from "react-router-dom";
import Topbar from "./scenes/global/Topbar";
import Ssidebar from "./scenes/global/Ssidebar";
import Dashboard from "./scenes/dashboard";
import Teacher from "./scenes/teacher";
// import Student from "./scenes/student"
// import Invoices from "./scenes/invoices";
// import Contacts from "./scenes/contacts";
// import Form from "./scenes/form";

function App() {
  const [theme, colorMode] = useMode();
  
  return (
  <ColorModeContext.Provider value={colorMode}>
    <ThemeProvider theme={theme}>
      <CssBaseline />
    <div className="app">
      <Ssidebar />
      <main className="content">
        <Topbar />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/teacher" element={<Teacher />} />
          {/* <Route path="/student" element={<Student />} /> */}
          {/* <Route path="/contacts" element={<Contacts />} /> */}
          {/* <Route path="/invoices" element={<Invoices />} /> */}
          {/* <Route path="/form" element={<Form />} /> */}
        </Routes>
      </main>
    </div>
    </ThemeProvider>
  </ColorModeContext.Provider>
  );
}

export default App;
