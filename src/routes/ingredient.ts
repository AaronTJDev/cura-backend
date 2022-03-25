import express from 'express';
import { router } from '.';

const ingredientRouter = express.Router();

ingredientRouter.get('/ingredient', (req, res) => {
  res.status(200).send('Hello Ingredients!');
});

export {
  ingredientRouter
};

