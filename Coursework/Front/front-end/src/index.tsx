import React from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css'; 
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
import App from './App';
import { Provider } from 'react-redux';
import { render } from 'react-dom';

import store from './store/store'
import './styles/Index.css'


render(
  <Provider store={store}>
      <App />
  </Provider>,
  document.getElementById('root')
);
