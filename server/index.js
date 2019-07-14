import env from '../env';
const express = require('express');
const app = express();
const router = require('./database');

app.get('/', (req, res) => res.send('Hello World!'));
app.get('/health', (req, res) => res.send('OK'));
app.get('/metadata', (req, res) => res.send(router.getMetadata));

app.listen(env.port, () => {
  console.log(`App listening on port ${env.port}`);
});
