import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import WorkersPage from './WorkersPage';
import DashboardsPage from "./DashboardsPage"
import EditWorker from './EditWorker';

function App() {
  return (
    <React.Fragment>
      <Router>
        <Route exact path="/workers" component={WorkersPage} />
        <Route exact path="/dashboards" component={DashboardsPage} />
      </Router>
    </React.Fragment>
  );
}

export default App;
