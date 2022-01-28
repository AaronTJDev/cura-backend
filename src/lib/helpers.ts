import { applicationDefault, initializeApp} from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';

export const logError = (err: any) => {
  console.error(err);
}

export const initializeFirebase = () => {
  initializeApp({
    credential: applicationDefault()
  });
}

export const createTokenResponse = async ( uid, res ) => {
  try {
    const token =  await getAuth().createCustomToken(uid);
    console.log('Successfully created new token:', token);
    res.status(200).send({ token });
  } catch(err) {
    logError(err);
    res.status(500).send(err);
  }
}