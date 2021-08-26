import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { FiMaximize2 } from 'react-icons/fi';
import store from './store/store';
import App from './router/App';

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>

  , document.getElementById('app'),
);
