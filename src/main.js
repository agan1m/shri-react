import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import Loadable from 'react-loadable';
import { Provider } from 'react-redux';
import createStore from './createStore';

import App from './containers/App';

import './styles/index.scss';

const serverData = window.__SERVER_DATA__;

const store = createStore(serverData);

export const main = () => {
  Loadable.preloadReady().then(() => {
    ReactDOM.hydrate(
      <Provider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>,
      document.getElementById('root')
    );
  });
};
