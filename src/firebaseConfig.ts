import { initializeApp } from 'firebase/app';
import { collection, doc, getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: process.env.VITE_FIREBASE_API_KEY,
  authDomain: process.env.VITE_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.VITE_FIREBASE_DATABASE_URL,
  projectId: process.env.VITE_FIREBASE_PROJECT_ID,
  messagingSenderId: process.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.VITE_FIREBASE_APP_ID,
  storageBucket: process.env.VITE_FIREBASE_STORAGE_BUCKET,
};

const app = initializeApp(firebaseConfig);
const firestoreDB = getFirestore(app);

const gameCollection = collection(firestoreDB, 'game');
const orangeClicksDocRef = doc(gameCollection, 'orangeClicks');
const blueClicksDocRef = doc(gameCollection, 'blueClicks');

export { firestoreDB, orangeClicksDocRef, blueClicksDocRef };
