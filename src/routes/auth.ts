import express from 'express';
import { getAuth } from 'firebase-admin/auth';

// Utils
import { createTokenResponse, logError } from '../lib/helpers';

const authRouter = express.Router();

authRouter.post('/register', async (req, res) => {
  const { email, password } = req.body;
  if (!!email && !!password) {
    try {
      const userRecord = await getAuth().createUser({ email, password });
      console.log('Successfully created new user:', userRecord.uid);
      await createTokenResponse(userRecord.uid, res);
    } catch(err) {
      logError(err);
      res.status(400).send(err);
    }
  } else {
    res.status(400).send('Missing email or password');
  }
});

export {
  authRouter
};