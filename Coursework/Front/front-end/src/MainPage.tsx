import React from 'react';

import TopBar from './TopBar';
import NavBar from './NavBar';
import WorkersList from './WorkersList';

export default class MainPage extends React.Component<any, any> {
  public render() {
    return(
      <>
      <TopBar />
      <NavBar />
      <WorkersList />
      </>
    );
  }
}
