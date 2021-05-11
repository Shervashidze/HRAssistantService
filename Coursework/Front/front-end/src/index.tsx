import React from 'react';
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
