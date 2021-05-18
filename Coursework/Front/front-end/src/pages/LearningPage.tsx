import React from 'react';

import TopBar from '../components/TopBar';
import NavBar from '../components/NavBar';
import LearningList from '../components/LearningList';

import { BrowserRouter as Router, Route, RouteComponentProps, Switch } from "react-router-dom";
import BlankPage from './blankPage';

interface MatchParams {
  eventId: string;
}

interface Props extends RouteComponentProps<MatchParams> {
}

export default class LearningPage extends React.Component<any, any> {
  public render() {
    return(
      <>
      <Route path="/products/:eventId" component={BlankPage} />

      <NavBar />
      <LearningList />
      </>
    );
  }
}
