import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import Loadable from 'react-loadable';
import { Provider } from 'react-redux';

import App from './components/App';

import './styles/index.scss';

const serverData = window.__SERVER_DATA__;

export const main = () => {
  Loadable.preloadReady().then(() => {
    ReactDOM.hydrate(
      <Provider store={serverData}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>,
      document.getElementById('root')
    );
  });
};
