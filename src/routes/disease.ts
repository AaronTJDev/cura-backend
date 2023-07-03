import express from 'express';
import { getRelatedDiseases } from '../database/diseases/read';
import { logError, logRequest } from '../lib/helpers';

const diseaseRouter = express.Router();

diseaseRouter.post('/disease', async (req, res) => {
  try {
    logRequest(req);
    if (req.body) {
      const { symptoms } = req.body;
      const diseases = await getRelatedDiseases(symptoms);
      res.status(200).send(diseases);
    }
  } catch(err) {
    logError(err);
    res.status(500).send(err);
  }
});

export {
  diseaseRouter
};