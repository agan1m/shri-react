import path from 'path';
import express from 'express';
import compression from 'compression';
import helmet from 'helmet';
import morgan from 'morgan';
import responseTime from 'response-time';
import bodyParser from 'body-parser';

import { renderServerSideApp } from './renderServerSideApp';
import router from './routes';
//import { todoRoutes } from './todoApi';

const { PUBLIC_URL = '' } = process.env;
global.reposPath = process.argv[2];
// This export is used by our initialization code in /scripts
export const app = express();

app.use(compression());
app.use(helmet());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
// Serve generated assets
app.use(PUBLIC_URL, express.static(path.resolve(__dirname, '../build')));

// Serve static assets in /public
app.use(PUBLIC_URL, express.static(path.resolve(__dirname, '../public')));

app.use(morgan('tiny'));

app.use(router);

//app.use(todoRoutes());

app.use(
  responseTime((_req, res, time) => {
    res.setHeader('X-Response-Time', time.toFixed(2) + 'ms');
    res.setHeader('Server-Timing', `renderServerSideApp;dur=${time}`);
  }),
);

app.use(renderServerSideApp);

app.use((req, res) => {
  res.status(404).json({ message: 'Not found' });
});
