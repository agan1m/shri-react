import path from 'path';
import express, { Request, Response } from 'express';

import compression from 'compression';

import helmet from 'helmet';

import morgan from 'morgan';

import responseTime from 'response-time';
import bodyParser from 'body-parser';

import { renderServerSideApp } from './renderServerSideApp';

import router from './routes';

const { PUBLIC_URL = '' } = process.env;
global.reposPath = process.argv[2];

export const app = express();


app.use(compression());
app.use(helmet());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

app.use(PUBLIC_URL, express.static(path.resolve(__dirname, '../build')));

app.use(PUBLIC_URL, express.static(path.resolve(__dirname, '../public')));

app.use(morgan('tiny'));

app.use(router);

app.use(
  responseTime((req: Request, res: Response, time: number) => {
    res.setHeader('X-Response-Time', time.toFixed(2) + 'ms');
    res.setHeader('Server-Timing', `renderServerSideApp;dur=${time}`);
  }),
);

app.use(renderServerSideApp);

app.use((req: Request, res: Response) => {
  res.status(404).json({ message: 'Not found' });
});
