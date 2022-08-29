if (!process.env.CLOUDSHELL_ENVIRONMENT) {
  require('dotenv').config();
}
import express from 'express';
import { router } from './routes';
import { initializeFirebase } from './lib/helpers';

const app = express();

initializeFirebase();
app.use(express.json());
app.use(router);

module.exports = app;