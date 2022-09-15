import express from 'express';
import { verifyToken } from '../lib/helpers';
import { ingredientRouter } from './ingredient';
import { diseaseRouter } from './disease';
import { symptomRouter } from './symptom';

const router = express.Router();

router.use(verifyToken);
router.use(symptomRouter);
router.use(ingredientRouter);
router.use(diseaseRouter);

export {
  router
};