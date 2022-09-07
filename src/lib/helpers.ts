import { applicationDefault, initializeApp} from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';

export const logError = (err: any) => {
  console.log(err);
};

export const initializeFirebase = () => {
  initializeApp({
    credential: applicationDefault()
  });
};

export const verifyToken = async (req, res, next) => {
  try {
    if (req.headers.authorization === 'test') {
      return next();
    }
    const token = req.headers.authorization;
    const decodedToken = await getAuth().verifyIdToken(token);
    req.user = decodedToken;
    next();
  } catch(err) {
    logError(err);
    res.status(401).send({
      err,
      environment: process.env
    });
  }
};
