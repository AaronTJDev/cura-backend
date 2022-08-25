import express from 'express';
import { verifyToken } from '../lib/helpers';
import { ingredientRouter } from './ingredient';
import { recipeRouter } from './recipe';
import { symptomRouter } from './symptom';

const router = express.Router();

router.use(verifyToken);
router.use(symptomRouter);
router.use(ingredientRouter);
router.use(recipeRouter);

export {
  router
};