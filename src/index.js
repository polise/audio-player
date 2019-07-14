import env from '../env';
import express from 'express';
import router from './database';
import { initialize } from './database/data';

const app = express();
// initialisedb
initialize();

app.get('/', (req, res) => res.send('Hello world'));
app.get('/health', (req, res) => res.send('OK'));
app.get('/metadata', async (req, res) => {
  try {
    const metadata = await router.getMetadata();
    res.send(metadata);
  } catch (error) {
    console.log('error', error);
  }
});

app.listen(env.port, () => {
  console.log('what is env?', env);
  console.log(`App listening on port ${env.port}`);
});
