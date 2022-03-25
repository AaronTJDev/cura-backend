import express from 'express';
import { verifyToken } from '../lib/helpers';
import { ingredientRouter } from './ingredient';
import { recipeRouter } from './recipe';
import { pantryRouter } from './pantry';

const router = express.Router();


router.use(verifyToken);
router.use(ingredientRouter);
router.use(recipeRouter);
router.use(pantryRouter);

export {
  router
};