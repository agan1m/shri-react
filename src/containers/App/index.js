import React from 'react';
import { Switch, Route, NavLink } from 'react-router-dom';
import Loadable from 'react-loadable';

const LoadableHome = Loadable({
  loader: () => import('../../components/Home'),
  loading: () => <div>Loading...</div>
});

const LoadableAbout = Loadable({
  loader: () => import('../../components/about/About'),
  loading: () => <div>Loading...</div>
});

const App = () => (
  <div className="app">
    <nav aria-label="main navigation">
      <NavLink exact to="/" activeClassName="active">
        Home
      </NavLink>{' '}
      <NavLink exact to="/about" activeClassName="active">
        About
      </NavLink>
    </nav>

    <main className="main">
      <Switch>
        <Route exact path="/" component={LoadableHome} />
        <Route path="/about" component={LoadableAbout} />
      </Switch>
    </main>

    <footer />
  </div>
);

export default App;
