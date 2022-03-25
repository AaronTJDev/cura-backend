import express from 'express';

const recipeRouter = express.Router();

recipeRouter.get('/recipe', (req, res) => {
  res.status(200).send('Hello Recipes!');
});

export {
  recipeRouter
};