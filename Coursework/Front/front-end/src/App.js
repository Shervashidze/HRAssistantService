import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import WorkersPage from './WorkersPage';
import LearningPage from "./LearningPage"
import DashboardsPage from "./DashboardsPage"
import EditWorker from './EditWorker';
import AccountPage from './AccountPage';

function App() {
  return (
    <React.Fragment>
      <Router>
        <Route exact path="/workers" component={WorkersPage} />
        <Route exact path="/learning" component={LearningPage} />
        <Route exact path="/dashboards" component={DashboardsPage} />
        <Route exact path="/account" component={AccountPage} />
      </Router>
    </React.Fragment>
  );
}

export default App;
