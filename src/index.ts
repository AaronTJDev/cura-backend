import express from 'express';
if (!process.env.CLOUDSHELL_ENVIRONMENT) {
  require('dotenv').config();
}

import { router } from './routes';
import { initializeFirebase } from './lib/helpers';
import { getAllSymptoms } from './database/symptoms/read';

const app = express();
const PORT = process.env.PORT || 8080;

initializeFirebase();

app.use(express.json());
app.use(router);
app.get('/', async (req, res) => {
  res.send('Hello');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});