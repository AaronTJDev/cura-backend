import express from 'express';
if (!process.env.CLOUDSHELL_ENVIRONMENT) {
  require('dotenv').config();
}

import { router } from './routes';
import { initializeFirebase } from './lib/helpers';
import { writeRecord } from './database';

const app = express();
const PORT = process.env.PORT || 8080;
console.log('testing nodemon c');

initializeFirebase();

app.use(express.json());
app.use(router);
app.get('/', async (req, res) => {
  await writeRecord();
  res.send('Hello World!')
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});