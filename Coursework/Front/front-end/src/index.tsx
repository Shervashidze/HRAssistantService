import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './Index.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import WorkersList from './WorkersList';

ReactDOM.render(
  <WorkersList />,
  document.getElementById('root')
);
