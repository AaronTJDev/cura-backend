import express from 'express';

const pantryRouter = express.Router();

pantryRouter.get('/pantry', (req, res) => {
  res.status(200).send('Hello Pantries!');
});

export {
  pantryRouter
};