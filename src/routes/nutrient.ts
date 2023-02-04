import express from 'express';
import { getRelatedNutrients } from '../database/nutrients/read';
import { logError } from '../lib/helpers';
import { errorMessages } from '../database/errors';

const nutrientRouter = express.Router();


export {
  nutrientRouter
};