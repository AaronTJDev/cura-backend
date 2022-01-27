import express from 'express';
import { getAuth } from 'firebase-admin/auth';

// Utils
import { logError } from '../lib/helpers';

const authRouter = express.Router();

authRouter.get('/register', (req, res) => {
  const { email, password } = req.body;
  if (!!email && !!password) {
    getAuth()
      .createUser({
        email,
        password
      })
      .then((userRecord) => {
        console.log('Successfully created new user:', userRecord.uid);
        res.status(200).send(userRecord);
      }).catch(err => {
        logError(err);
        res.status(400).send(err);
      });
      return;
  } else {
    res.status(400).send('Missing email or password');
  }
});

authRouter.get('/login', (req, res) => {
  res.send('auth route');
});

export {
  authRouter
};