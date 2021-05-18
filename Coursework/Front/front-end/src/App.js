import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import WorkersPage from './WorkersPage';
import LearningPage from "./LearningPage"
import DashboardsPage from "./DashboardsPage"
import AddWorkerPage from './AddWorkerPage';
import AccountPage from './AccountPage';
import AddLearningEventPage from './AddLearningEventPage';

function App() {
  return (
    <React.Fragment>
      <Router>
        <Route exact path="/workers" component={WorkersPage} />
        <Route exact path="/learning" component={LearningPage} />
        <Route exact path="/dashboards" component={DashboardsPage} />
        <Route exact path="/account" component={AccountPage} />
        <Route exact path="/addWorker" component={AddWorkerPage} />
        <Route exact path="/addLearningEvent" component={AddLearningEventPage} />
      </Router>
    </React.Fragment>
  );
}

export default App;
