
import { useDispatch, useSelector } from 'react-redux'
import { BrowserRouter as Router, Redirect, Route, Switch} from 'react-router-dom'
import { selectLoginstatus, login, unlog } from '../slicers/slicer'
import React, { Fragment, useState } from 'react';

import "bootstrap/dist/css/bootstrap.min.css";


import WorkersPage from '../pages/WorkersPage';
import LearningPage from "../pages/LearningPage";
import DashboardsPage from "../pages/DashboardsPage";
import EditWorker from '../pages/EditWorker';


import LoginPage from '../pages/LoginPage';
import AccountPage from '../pages/AccountPage'

import { createBrowserHistory } from 'history';
import {CreateWorkerRouter}  from './worker/WorkerRouter'
import {CreateInfoPage} from './worker/WorkerPersonalPage'
import AddWorkerPage from '../pages/AddWorkerPage'
import EditWorkerPage from '../pages/EditWorkerPage'
import {CreateLearningEventPage} from '../pages/AddLearningEventPage'
import { ViewLearningEventPage } from '../pages/ViewLearningEventPage'
import NavBar from '../components/NavBar';
import { CreateTopBar} from './worker/Topbar'
import { EditLearningEventPage } from '../pages/EditLearningEventPage';

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
            return(
            <Fragment>
            <CreateTopBar/>
            <NavBar/>
            <Switch>
                <Route exact path="/workers" component={WorkersPage} />
                <Route exact path="/learning" component={LearningPage} />
                <Route exact path="/dashboards" component={DashboardsPage} />
                <Route exact path="/account" component={AccountPage} />
                <Route exact path="/addWorker" component={AddWorkerPage} />
                <Route exact path="/addLearningEvent" component={CreateLearningEventPage} />
                <Route exact path="/editLearningEvent/:id" component={EditLearningEventPage}  />
                <Route exact path="/learning/:id" component={ViewLearningEventPage}/>
                <Route exact path="/editWorker/:id" component={EditWorkerPage}/>
                <Route exact path="/info" component={CreateInfoPage}/>
                <Route render={() => <Redirect to="/info" />} />
            </Switch>
            </Fragment>)
        case "Worker":
            return(<CreateWorkerRouter/>)

        case "RN":
            return(<></>)

        default:
            console.log("WTF")
    }
}