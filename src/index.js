import express from 'express';
import Joi from '@hapi/joi';
import env from '../env';
import { initialize } from './database/connection';
import metadataHandler from './controllers/metadata';

const validator = require('express-joi-validation').createValidator();

const app = express();
initialize();

const querySchema = Joi.object({
  pageNo: Joi.number()
    .min(1)
    .required(),
  size: Joi.number()
    .min(1)
    .required(),
});

app.use('/media', express.static(__dirname + '/media'));
app.get('/', (req, res) => res.send('Hello world'));
app.get('/health', (req, res) => res.send('OK'));
app.get('/metadata', validator.query(querySchema), metadataHandler);

app.listen(env.port, () => {
  console.log(`App listening on port ${env.port}`);
});
