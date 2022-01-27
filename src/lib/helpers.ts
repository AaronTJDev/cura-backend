import { applicationDefault, cert, initializeApp} from 'firebase-admin/app';

export const logError = (err: any) => {
  console.error(err);
}

export const initializeFirebase = () => {
  initializeApp({
    credential: applicationDefault()
  });
}