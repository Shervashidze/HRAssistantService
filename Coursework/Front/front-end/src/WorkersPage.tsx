import React from 'react';

import TopBar from './components/TopBar';
import NavBar from './components/NavBar';
import WorkersList from './components/WorkersList';
import WorkerCard from './components/WorkerCard';

export default class WorkersPage extends React.Component<any, any> {
  public render() {
    return(
      <>
      <TopBar />
      <NavBar />
      <div className='rowC'>
            <WorkersList />
            <WorkerCard />
        </div>
      </>
    );
  }
}
