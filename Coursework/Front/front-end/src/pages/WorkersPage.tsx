import React from 'react';

import {CreateTopBar} from '../components/TopBar';
import NavBar from '../components/NavBar';
import WorkersList from '../components/WorkersList';
import WorkerCard from '../components/WorkerCard';

export default class WorkersPage extends React.Component<any, any> {
  public render() {
    return(
      <>
      <h1 style={{textAlign: 'center', margin: '10px 0 0 0'}}>Список всех сотрудников</h1>
      <div className='rowC'>
            <WorkersList />
        </div>
      </>
    );
  }
}
