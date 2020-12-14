import React from 'react';

import TopBar from './components/TopBar';
import NavBar from './components/NavBar';
import WorkersList from './components/WorkersList';

export default class WorkersPage extends React.Component<any, any> {
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
