import React from 'react';
import { BrowserRouter as Router, Switch, Route, RouteComponentProps } from "react-router-dom";
import Login from './pages/auth/Login';


function App() {
  return (
    <div>
      <Router>
        <Switch>
          <Route path="/login" exact component={Login} />
        </Switch>
      </Router>
    </div>
  );
};

export default App;
