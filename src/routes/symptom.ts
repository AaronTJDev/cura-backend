import express from 'express';
import { errorMessages } from '../database/errors';
import { getAllSymptoms } from '../database/symptoms/read';


const symptomRouter = express.Router();

symptomRouter.get('/symptoms', async (req, res) => {
  try {
    const symptoms = await getAllSymptoms();
    res.status(200).send(symptoms);
  } catch(err) {
    res.status(500).send(`${errorMessages.symptom.getAllSymptoms}: ${err}`);
  }
});

export {
  symptomRouter
};