import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import WorkersPage from './WorkersPage';
import LearningPage from "./LearningPage"
import DashboardsPage from "./DashboardsPage"
import AddWorker from './AddWorker';
import AccountPage from './AccountPage';

function App() {
  return (
    <React.Fragment>
      <Router>
        <Route exact path="/workers" component={WorkersPage} />
        <Route exact path="/learning" component={LearningPage} />
        <Route exact path="/dashboards" component={DashboardsPage} />
        <Route exact path="/account" component={AccountPage} />
        <Route exact path="/addWorker" component={AddWorker} />
      </Router>
    </React.Fragment>
  );
}

export default App;
