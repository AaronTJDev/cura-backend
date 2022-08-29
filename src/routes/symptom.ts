import express from 'express';
import { errorMessages } from '../database/errors';
import { getAllSymptoms, getSymptomsByName } from '../database/symptoms/read';


const symptomRouter = express.Router();

symptomRouter.get('/symptoms', async (req, res) => {
  try {
    const symptoms = await getAllSymptoms();
    res.status(200).send(symptoms);
  } catch(err) {
    res.status(500).send(`${errorMessages.symptom.getAllSymptoms}: ${err}`);
  }
});

symptomRouter.get('/symptoms/search', async (req, res) => {
  try {
    const { query } = req.query;
    if (!!query) {
      const symptoms = await getSymptomsByName(query as string);
      res.status(200).send(symptoms);
    } else {
      throw new Error(errorMessages.symptom.queryEmpty);
    }

  } catch(err) {
    res.status(500).send(`Error fetching query with parameters ${JSON.stringify(req.query)}
    ${err}`);
  }
})

export {
  symptomRouter
};