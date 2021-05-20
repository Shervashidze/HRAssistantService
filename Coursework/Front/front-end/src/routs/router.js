
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
import {CreateInfoPage} from './worker/WorkerPersonalPage'
import AddWorkerPage from '../pages/WorkersPage'
import AddLearningEventPage from '../pages/AddLearningEventPage'

const history = createBrowserHistory({});


export function CreateRouter() {
    const log = useSelector(selectLoginstatus)
    const dispatch = useDispatch()

    
    const logstatus = log.logstatus
    console.log(log)

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
            return(
            <Switch>
                <Route exact path="/workers" component={WorkersPage} />
                <Route exact path="/learning" component={LearningPage} />
                <Route exact path="/dashboards" component={DashboardsPage} />
                <Route exact path="/account" component={AccountPage} />
                <Route exact path="/addWorker" component={AddWorkerPage} />
                <Route exact path="/addLearningEvent" component={AddLearningEventPage} />
            </Switch>)
        case "Worker":
            return(<CreateWorkerRouter/>)

        case "RN":
            return(<></>)

        default:
            console.log("WTF")
    }
}