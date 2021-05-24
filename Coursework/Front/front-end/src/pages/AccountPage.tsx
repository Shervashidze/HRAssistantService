import React from 'react';

import {CreateTopBar} from '../components/TopBar';
import NavBar from '../components/NavBar';
import WorkerCard from '../components/WorkerCard';

export default class AccountPage extends React.Component<any, any> {
  public render() {
    return(
      <>
      <div className="account"> <WorkerCard /> </div>
      </>
    );
  }
}
