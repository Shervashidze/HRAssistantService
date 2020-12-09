import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import './Index.css'
import './TopBar.css'
import 'bootstrap/dist/css/bootstrap.min.css';

import WorkersList from './WorkersList';
import TopBar from './TopBar';
import NavBar from './NavBar';

ReactDOM.render(
  <div>
    <TopBar />
    <NavBar />
    <WorkersList />
  </div>,
  document.getElementById('root')
);
