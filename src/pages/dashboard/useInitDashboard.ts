import { useEffect, useState, useRef } from 'react';
import { gameDocRef } from 'firebaseConfig';
import { setDoc, onSnapshot, Timestamp, Unsubscribe } from 'firebase/firestore';

const GAME_TIME = 5000; // 5 seconds

interface GameDoc {
  orangeClicks: Timestamp[];
  blueClicks: Timestamp[];
  startTime: Timestamp;
}

const useInitDashboard = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [loadingError, setLoadingError] = useState('');
  const [orangeClickTimestamps, setOrangeClickTimestamps] = useState<number[]>(
    []
  );
  const [blueClickTimestamps, setBlueClickTimestamps] = useState<number[]>([]);
  const [isGameFinished, setIsGameFinished] = useState(false);
  const unsubscribeRef = useRef<Unsubscribe | null>(null);

  const unsubscribeFromDatabaseUpdates = () => {
    if (unsubscribeRef.current) {
      unsubscribeRef.current();
    }
  };

  useEffect(() => {
    const setupDatabase = async () => {
      try {
        // First set up the new game
        await setDoc(gameDocRef, {
          orangeClicks: [],
          blueClicks: [],
          startTime: Timestamp.fromDate(new Date()),
        });

        // Then listen to game updates from the client
        unsubscribeRef.current = onSnapshot(gameDocRef, (snapshot) => {
          const data = snapshot.data() as GameDoc;

          const blueClicks = data.blueClicks.map((dbTimestamp) =>
            dbTimestamp.toMillis()
          );
          const orangeClicks = data.orangeClicks.map((dbTimestamp) =>
            dbTimestamp.toMillis()
          );

          setBlueClickTimestamps(blueClicks);
          setOrangeClickTimestamps(
            data.orangeClicks.map((dbTimestamp) => dbTimestamp.toMillis())
          );

          if (orangeClicks.length + blueClicks.length === 1) {
            // Means it's the first click coming in, so start the timer in the component
            setTimeout(() => {
              setIsGameFinished(true);

              unsubscribeFromDatabaseUpdates();
            }, GAME_TIME);
          }
        });
      } catch (e: any) {
        setLoadingError(e);
      }

      setIsLoading(false);
    };

    setupDatabase();

    return () => unsubscribeFromDatabaseUpdates();
  }, []);

  return {
    isLoading,
    loadingError,
    orangeClickTimestamps,
    blueClickTimestamps,
    isGameFinished,
  };
};

export default useInitDashboard;
