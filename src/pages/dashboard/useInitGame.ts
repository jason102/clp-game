import { useEffect, useState, useRef } from 'react';
import { firestoreDB } from 'firebaseConfig';
import {
  addDoc,
  collection,
  onSnapshot,
  Timestamp,
  Unsubscribe,
} from 'firebase/firestore';

interface GameDoc {
  orangeClicks: Timestamp[];
  blueClicks: Timestamp[];
  startTime: Timestamp;
}

const useInitGame = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [loadingError, setLoadingError] = useState('');
  const [orangeClickTimestamps, setOrangeClickTimestamps] = useState<number[]>(
    []
  );
  const [blueClickTimestamps, setBlueClickTimestamps] = useState<number[]>([]);
  const unsubscribeSnapshot = useRef<Unsubscribe | null>(null);

  useEffect(() => {
    const setupDatabase = async () => {
      try {
        const gameDocRef = await addDoc(collection(firestoreDB, 'games'), {
          orangeClicks: [],
          blueClicks: [],
          startTime: Timestamp.fromDate(new Date()),
        });

        unsubscribeSnapshot.current = onSnapshot(gameDocRef, (snapshot) => {
          const data = snapshot.data() as GameDoc;

          setBlueClickTimestamps(
            data.blueClicks.map((dbTimestamp) => dbTimestamp.toMillis())
          );
          setOrangeClickTimestamps(
            data.orangeClicks.map((dbTimestamp) => dbTimestamp.toMillis())
          );
        });
      } catch (e: any) {
        setLoadingError(e);
      } finally {
        setIsLoading(false);
      }
    };

    setupDatabase();

    return () => {
      if (unsubscribeSnapshot.current) {
        unsubscribeSnapshot.current();
      }
    };
  }, []);

  return {
    isLoading,
    loadingError,
    orangeClickTimestamps,
    blueClickTimestamps,
  };
};

export default useInitGame;
