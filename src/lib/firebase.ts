import { initializeApp, cert, getApps, getApp } from 'firebase-admin/app';
import { getFirestore, FieldValue } from 'firebase-admin/firestore';

const serviceAccount = {
  projectId: process.env.FIREBASE_PROJECT_ID,
  clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
  // Handle newline characters in the private key
  privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
};

let app;

// Avoid multiple initializations in development
if (!getApps().length) {
  try {
    if (serviceAccount.projectId && serviceAccount.clientEmail && serviceAccount.privateKey) {
      app = initializeApp({
        credential: cert(serviceAccount),
      });
      console.log('Firebase Admin initialized successfully.');
    } else {
      console.warn('Firebase credentials not fully provided in environment variables.');
    }
  } catch (error) {
    console.error('Firebase Admin initialization error', error);
  }
} else {
  app = getApp();
}

export const db = getApps().length ? getFirestore(app) : null;
export { FieldValue };
