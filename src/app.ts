if (!process.env.CLOUDSHELL_ENVIRONMENT) {
  require('dotenv').config();
}
import express from 'express';
import { router } from './routes';
import { initializeFirebase } from './lib/helpers';

const app = express();
const lb = require('@google-cloud/logging-bunyan');

async function startServer() {
  const { mw } = await lb.express.middleware({
    logName: 'cura-a5ce4',
    projectId: 'cura-a5ce4'
  });
  
  initializeFirebase();

  app.use(mw);
  app.use(express.json());
  app.use(router);
  
  
  const PORT = process.env.PORT || 8080;
  app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}:`);
  });
}

module.exports = {
  startServer
};