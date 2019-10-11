import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Loadable from 'react-loadable';

import Header from '../../components/Header';

import Footer from '../../components/Footer';

import SubHeader from '../../components/SubHeader';

import Title from '../../components/Title';
import './index.scss';

const LoadableFiles = Loadable({

  loader: () => import('../FilesPage'),
  loading: () => <div>Loading...</div>,
});

const LoadableFile = Loadable({

  loader: () => import('../FilePage'),
  loading: () => <div>Loading...</div>,
});

const App = () => (
  <div className="app">
    <Header />
    <main className="Container">
      <SubHeader />
      <Title />
      <Switch>
        <Route exact path="/:file+/blob" component={LoadableFile} />
        <Route path="/" component={LoadableFiles} />
      </Switch>
    </main>
    <Footer />
  </div>
);

export default App;
