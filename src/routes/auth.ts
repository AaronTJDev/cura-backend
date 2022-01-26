import express from 'express';
import { db } from '../db';

const authRouter = express.Router();

authRouter.get('/auth', (req, res) => {
  res.send('auth route');
});

export {
  authRouter
};