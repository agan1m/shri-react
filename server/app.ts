const path = require('path');
const express = require('express');

// const { Request, Response } = require('express');

const compression = require('compression');

const helmet = require('helmet');

const morgan = require('morgan');

const responseTime = require('response-time');
const bodyParser = require('body-parser');

const { renderServerSideApp } = require('./renderServerSideApp');

//const router = require('./routes');

const { PUBLIC_URL = '' } = process.env;
global.reposPath = process.argv[2];

const app = express();

exports.app;

app.use(compression());
app.use(helmet());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

app.use(PUBLIC_URL, express.static(path.resolve(__dirname, '../build')));

app.use(PUBLIC_URL, express.static(path.resolve(__dirname, '../public')));

app.use(morgan('tiny'));

app.use(router);
// @ts-ignore
app.use(
  // @ts-ignore
  responseTime((req, res: Express.Response, time: number) => {
    // @ts-ignore
    res.setHeader('X-Response-Time', time.toFixed(2) + 'ms');
    // @ts-ignore
    res.setHeader('Server-Timing', `renderServerSideApp;dur=${time}`);
  }),
);

app.use(renderServerSideApp);

app.use((req: Request, res: Response) => {
  // @ts-ignore
  res.status(404).json({ message: 'Not found' });
});
