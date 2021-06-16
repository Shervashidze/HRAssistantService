import React, { Fragment } from 'react'
import { BrowserRouter as Router, Redirect, Route, Switch} from 'react-router-dom'


import { CreateTopBar} from './Topbar'
import { selectLoginstatus, login } from '../../slicers/slicer'
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import {CreateInfoPage} from './WorkerPersonalPage'
import { LEList } from './workerLEList'
import { CreateWorkerEvent } from './WorkerEventPage'


export function CreateWorkerRouter () {
    return (
        <Fragment>
            <CreateTopBar/>
            <Switch>
                <Route exact path='/info' component={CreateInfoPage}/>
                <Route exact path='/learning' component={LEList}/>
                <Route path='/learning/:id' component={CreateWorkerEvent}/>
                <Route render={() => <Redirect to="/info" />} />
            </Switch>
        </Fragment>)
}
