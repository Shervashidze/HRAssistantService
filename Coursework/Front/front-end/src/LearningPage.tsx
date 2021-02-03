import React from 'react';

import TopBar from './components/TopBar';
import NavBar from './components/NavBar';
import LearningList from './components/LearningList';

export default class LearningPage extends React.Component<any, any> {
  public render() {
    return(
      <>
      <TopBar />
      <NavBar />
      <LearningList />
      </>
    );
  }
}
