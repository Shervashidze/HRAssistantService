import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import WorkersPage from './pages/WorkersPage';
import LearningPage from "./pages/LearningPage";
import DashboardsPage from "./pages/DashboardsPage";
import BlankPage from "./pages/blankPage";
import EditWorker from './pages/EditWorker';

function App() {
  return (
    <React.Fragment>
      <Router>
        <Route exact path="/workers" component={WorkersPage} />
        <Route exact path="/learning" component={LearningPage} />
        <Route exact path="/learning/:id" component={BlankPage}/>
        <Route exact path="/dashboards" component={DashboardsPage} />
      </Router>
    </React.Fragment>
  );
}

export default App;
