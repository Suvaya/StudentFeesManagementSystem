import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Teachers from './pages/Teachers';
import Students from './pages/Students';
// import Settings from './pages/Settings';

function App() {
  return (
      <Router>
        <Switch>
          <Route path="/dashboard" component={Dashboard} />
          <Route path="/teachers" component={Teachers} />
          <Route path="/students" component={Students} />
          {/*<Route path="/settings" component={Settings} />*/}
          {/* Redirect to dashboard as a default route */}
          <Route path="/" exact component={Dashboard} />
        </Switch>
      </Router>
  );
}

export default App;
