import express from 'express';
import Joi from '@hapi/joi';
import cors from 'cors';
import env from '../env';
import { initialize } from './database/connection';
import metadataHandler from './controllers/metadata';
import downloadSongHandler from './controllers/downloadSong';

const validator = require('express-joi-validation').createValidator();

var corsOptions = {
  origin: env.appUrl,
  optionsSuccessStatus: 200,
};

const app = express();

// initialize db with test data
initialize();

// validators
const metadataQuerySchema = Joi.object({
  pageNo: Joi.number()
    .min(1)
    .required(),
  size: Joi.number()
    .min(1)
    .required(),
});

const downloadSongQuerySchema = Joi.object({
  id: Joi.number().required(),
});

// health checks
app.get('/', (req, res) => res.send('Hello world'));
app.get('/health', (req, res) => res.send('OK'));

app.get(
  '/metadata',
  [validator.query(metadataQuerySchema), cors(corsOptions)],
  metadataHandler,
);

app.get(
  '/download/:id',
  [validator.params(downloadSongQuerySchema), cors(corsOptions)],
  downloadSongHandler,
);

app.listen(env.port, () => {
  console.log(`App listening on port ${env.port}`);
});
