import React from 'react';

import TopBar from '../components/TopBar';
import NavBar from '../components/NavBar';
import WorkerCard from '../components/WorkerCard';

export default class AccountPage extends React.Component<any, any> {
  public render() {
    return(
      <>
      <TopBar />
      <NavBar />
      <div className="account"> <WorkerCard /> </div>
      </>
    );
  }
}
