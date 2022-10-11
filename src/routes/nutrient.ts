import express from 'express';
import { getRelatedNutrients } from '../database/nutrients/read';
import { logError } from '../lib/helpers';
import { errorMessages } from '../database/errors';

const nutrientRouter = express.Router();

nutrientRouter.get('/nutrients/symptom/:id', async (req, res) => {
  try {
    if (req.params && req.params.id) {
      const { id: symptomId } = req.params;
      const nutrients = await getRelatedNutrients(symptomId);
      res.status(200).send(nutrients);
    } else {
      throw new Error(errorMessages.nutrients.idNotProvided);
    }
  } catch(err) {
    logError(err);
    res.status(500).send(err);
  }
});

export {
  nutrientRouter
};