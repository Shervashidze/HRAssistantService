import React, { useState } from 'react';
import { BrowserRouter as Router , Route, Switch, Redirect } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import WorkersPage from './pages/WorkersPage';
import LearningPage from "./pages/LearningPage";
import DashboardsPage from "./pages/DashboardsPage";
import BlankPage from "./pages/blankPage";
import EditWorker from './pages/EditWorker';
import AccountPage from './pages/AccountPage'
import { useSelector, useDispatch } from 'react-redux';
import { loginStatus } from './slicers/slicer'
import { CreateRouter } from './routs/router'

class App extends React.Component {

  render() {
    return (
      <React.Fragment>
        <CreateRouter/>
      </React.Fragment>
    );
  }
}

export default App;
