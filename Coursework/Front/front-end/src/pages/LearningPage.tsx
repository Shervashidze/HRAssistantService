import React from 'react';

import {CreateTopBar} from '../components/TopBar';
import NavBar from '../components/NavBar';

import { BrowserRouter as Router, Route, RouteComponentProps, Switch } from "react-router-dom";
import {CreateLearningList} from '../components/CreateLearningList'


export default class LearningPage extends React.Component<any, any> {
  public render() {
    return(
      <>
      <h1 style={{textAlign: 'center', margin: '10px 0 0 0'}}>Список всех обучающих мероприятий</h1>
      <CreateLearningList/>
      </>
    );
  }
}
