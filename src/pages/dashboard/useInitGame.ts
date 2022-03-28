import { useEffect, useState } from 'react';
import { firestoreDB } from 'firebaseConfig';
import { addDoc, collection, Timestamp } from 'firebase/firestore';

const useInitGame = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [loadingError, setLoadingError] = useState('');

  useEffect(() => {
    const setupDatabase = async () => {
      try {
        await addDoc(collection(firestoreDB, 'games'), {
          orangeClicks: [],
          blueClicks: [],
          startTime: Timestamp.fromDate(new Date()),
        });
      } catch (e: any) {
        setLoadingError(e);
      } finally {
        setIsLoading(false);
      }
    };

    setupDatabase();
  }, []);

  return { isLoading, loadingError };
};

export default useInitGame;
