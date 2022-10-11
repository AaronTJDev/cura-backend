import express from 'express';
import { verifyToken } from '../lib/helpers';
import { ingredientRouter } from './ingredient';
import { diseaseRouter } from './disease';
import { symptomRouter } from './symptom';
import { nutrientRouter } from './nutrient';

const router = express.Router();

router.use(verifyToken);
router.use(symptomRouter);
router.use(diseaseRouter);
router.use(nutrientRouter);
router.use(ingredientRouter);

export {
  router
};