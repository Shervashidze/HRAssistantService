import React from 'react';

import TopBar from './TopBar';
import NavBar from './NavBar';

export default class EditWorker extends React.Component<any, any> {
  public render() {
    return(
      <>
      <TopBar />
      <NavBar />
      <h3>Это страница дэшбордов</h3>
      </>
    );
  }
}
