import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import MainPage from './MainPage';
import LearningPage from "./LearningPage"
import DashboardsPage from "./DashboardsPage"
import EditWorker from './EditWorker';

function App() {
  return (
    <React.Fragment>
      <Router>
        <Route exact path="/workers" component={MainPage} />
        <Route exact path="/learning" component={LearningPage} />
        <Route exact path="/dashboards" component={DashboardsPage} />
      </Router>
    </React.Fragment>
  );
}

export default App;
