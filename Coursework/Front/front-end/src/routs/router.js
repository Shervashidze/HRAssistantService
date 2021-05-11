
import { useDispatch, useSelector } from 'react-redux'
import { BrowserRouter as Router, Redirect, Route, Switch} from 'react-router-dom'
import { selectLoginstatus, login, unlog } from '../slicers/slicer'
import React, { Fragment, useState } from 'react';

import "bootstrap/dist/css/bootstrap.min.css";


import WorkersPage from '../pages/WorkersPage';
import LearningPage from "../pages/LearningPage";
import DashboardsPage from "../pages/DashboardsPage";
import BlankPage from "../pages/blankPage";
import EditWorker from '../pages/EditWorker';


import LoginPage from '../pages/LoginPage';
import AccountPage from '../pages/AccountPage'

import { createBrowserHistory } from 'history';
import  {CreateWorkerRouter}  from './worker/WorkerRouter'

const history = createBrowserHistory({});


export function CreateRouter() {
    const log = useSelector(selectLoginstatus)
    const dispatch = useDispatch()

    
    const logstatus = log.logstatus

    return (
        <React.Fragment>
            <Router history={history}>
                <Route path="" render={() => authentication(logstatus)} />
            </Router>
        </React.Fragment>
    )
}

const authentication = (logstatus) => {
    switch (logstatus) {
        case "unlog":
            return(
                <Switch>
                    <Route path='/' component={LoginPage}/>
                    <Redirect to='/' />
                </Switch>)
        case "Admin":
            return(<Redirect to="/app" />)

        case "Worker":
            return(<CreateWorkerRouter/>)

        case "RN":
            return(<></>)

        default:
            console.log("WTF")
    }
}