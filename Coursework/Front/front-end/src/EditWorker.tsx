import React from 'react';

import TopBar from './components/TopBar';
import NavBar from './components/NavBar';

export default class EditWorker extends React.Component<any, any> {
  public render() {
    return(
      <>
      <TopBar />
      <NavBar />
      <h3></h3>
      </>
    );
  }
}
