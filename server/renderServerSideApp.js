import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import Loadable from 'react-loadable';
import { Provider } from 'react-redux';
import { getBundles } from 'react-loadable/webpack';
import stats from '../build/react-loadable.json';
import App from '../src/containers/App';
import { fetchDataForRender } from './fetchDataForRender';
import { indexHtml } from './indexHtml';
import createStore from '../src/createStore';


const ServerApp = ({ context, data, location }) => {
  const store = createStore(data);
  return (
    <Provider store={store}>
      <StaticRouter location={location} context={context}>
        <App />
      </StaticRouter>
    </Provider>
  );
};

export const renderServerSideApp = (req, res) => {
  Loadable.preloadAll()
    .then(() => fetchDataForRender(ServerApp, req))
    .then(data => renderApp(ServerApp, data, req, res));
};

function renderApp(ServerApp, data, req, res) {
  const context = {};
  const modules = [];

  const markup = ReactDOMServer.renderToString(
    <Loadable.Capture report={moduleName => modules.push(moduleName)}>
      <ServerApp location={req.url} data={data} context={context} />
    </Loadable.Capture>
  );

  if (context.url) {
    res.redirect(context.url);
  } else {
    const fullMarkup = indexHtml({
      serverData: data,
      bundles: getBundles(stats, modules),
      markup
    });

    res.status(200).send(fullMarkup);
  }
}
