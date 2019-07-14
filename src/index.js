import env from '../env';
import express from 'express';

const app = express();
const router = require('./database');

app.get('/', (req, res) => res.send('Hello world'));
app.get('/health', (req, res) => res.send('OK'));
app.get('/metadata', (req, res) => res.send(router.getMetadata));

app.listen(env.port, () => {
  console.log('what is env?', env);
  console.log(`App listening on port ${env.port}`);
});
