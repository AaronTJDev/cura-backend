import express, { Request, RequestHandler, Response } from 'express';
import { logError } from '../lib/helpers';
import { errorMessages } from '../database/errors';
import { getFoodsWithSignificantNutrientAmount } from '../database/nutrients/read';

const nutrientRouter = express.Router();

type NutrientRequestBody = {
  age: number | string;
  gender: string;
  nutrientName: string[];
  threshold?: number;
  pageNumber?: string | number;
  pageOffset?: number;
}


nutrientRouter.post('/nutrients/food', async (req, res) => {
  try {
    if (!req?.body && !req.body.nutrientName) {
      throw new Error(errorMessages.nutrients.nutrientNameUndefined);
    }
    
    const {
      age,
      gender,
      nutrientName,
      threshold,
      pageNumber,
      pageOffset,
      filter,
      symptomKey
    } = req.body;

    const nutrients = await getFoodsWithSignificantNutrientAmount({
      nutrientName,
      gender,
      age,
      threshold,
      pageNumber,
      pageOffset,
      filter,
      symptomKey
    });

    res.status(200).send(nutrients);
  } catch(err) {
    logError(err);
    res.status(500).send(err);
  }
});


export {
  nutrientRouter
};