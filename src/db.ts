import { initializeApp, applicationDefault, cert } from 'firebase-admin/app';
import { getFirestore, Timestamp, FieldValue } from 'firebase-admin/firestore';
const serviceAccount = require('./env/serviceAccountKey.json');

initializeApp({
  credential: cert(serviceAccount)
});

export const db = getFirestore();