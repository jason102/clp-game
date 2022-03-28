import { initializeApp } from 'firebase/app';
import { collection, doc, getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  databaseURL: import.meta.env.VITE_FIREBASE_DATABASE_URL,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
} as { [key: string]: string | undefined };

const app = initializeApp(firebaseConfig);
const firestoreDB = getFirestore(app);

const gameCollection = collection(firestoreDB, 'game');
const orangeClicksDocRef = doc(gameCollection, 'orangeClicks');
const blueClicksDocRef = doc(gameCollection, 'blueClicks');

export { firestoreDB, orangeClicksDocRef, blueClicksDocRef };
