import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import AuthService from "./services/auth.service";

import WorkersPage from './pages/WorkersPage';
import LearningPage from "./pages/LearningPage";
import DashboardsPage from "./pages/DashboardsPage";
import BlankPage from "./pages/blankPage";
import EditWorker from './pages/EditWorker';
import Login from './components/login.component.js';


class App extends React.Component {
  render() {
    return (
      <React.Fragment>
        <Router>
          <Route exact path="/workers" component={WorkersPage} />
          <Route exact path="/learning" component={LearningPage} />
          <Route exact path="/learning/:id" component={BlankPage}/>
          <Route exact path="/dashboards" component={DashboardsPage} />
          <Route exact path="/login" component={Login} />
        </Router>
      </React.Fragment>
    );
  }
}



export default App;
