import { useEffect, useState, useRef, useCallback } from 'react';
import { blueClicksDocRef, orangeClicksDocRef } from 'firebaseConfig';
import { setDoc, onSnapshot, Timestamp, Unsubscribe } from 'firebase/firestore';
import { GAME_TIME } from 'helpers';

const useInitDashboard = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [loadingError, setLoadingError] = useState('');
  const [orangeClickTimestampData, setOrangeClickTimestampData] = useState<
    Timestamp[]
  >([]);
  const [blueClickTimestampData, setBlueClickTimestampData] = useState<
    Timestamp[]
  >([]);
  const [orangeClickTimestamps, setOrangeClickTimestamps] = useState<number[]>(
    []
  );
  const [blueClickTimestamps, setBlueClickTimestamps] = useState<number[]>([]);
  const [isGameFinished, setIsGameFinished] = useState(false);
  const orangeButtonUnsubscribeRef = useRef<Unsubscribe | null>(null);
  const blueButtonUnsubscribeRef = useRef<Unsubscribe | null>(null);
  const startingTime = useRef(0);

  const unsubscribeFromDatabaseUpdates = () => {
    if (orangeButtonUnsubscribeRef.current) {
      orangeButtonUnsubscribeRef.current();
    }

    if (blueButtonUnsubscribeRef.current) {
      blueButtonUnsubscribeRef.current();
    }
  };

  const setupTimer = useCallback(() => {
    // Means it's the first click coming in, so start the timer in the component
    startingTime.current = Date.now();

    setTimeout(() => {
      setIsGameFinished(true);

      unsubscribeFromDatabaseUpdates();
    }, GAME_TIME);
  }, []);

  useEffect(() => {
    const setupDatabase = async () => {
      try {
        // First set up the new game
        await Promise.all([
          setDoc(orangeClicksDocRef, {
            clicks: [],
          }),
          setDoc(blueClicksDocRef, {
            clicks: [],
          }),
        ]);

        // Then listen to blue click updates from the client
        // Note that due to the problem of closures (we need the latest values of other state data), the code for handling these updates from the listeners are in separate useEffects below
        blueButtonUnsubscribeRef.current = onSnapshot(
          blueClicksDocRef,
          (snapshot) => {
            const { clicks: blueClicks } = snapshot.data() as {
              clicks: Timestamp[];
            };

            setBlueClickTimestampData(blueClicks);
          }
        );

        // Orange click updates
        orangeButtonUnsubscribeRef.current = onSnapshot(
          orangeClicksDocRef,
          (snapshot) => {
            const { clicks: orangeClicks } = snapshot.data() as {
              clicks: Timestamp[];
            };

            setOrangeClickTimestampData(orangeClicks);
          }
        );
      } catch (e: any) {
        setLoadingError(e);
      }

      setIsLoading(false);
    };

    setupDatabase();

    return () => unsubscribeFromDatabaseUpdates();
  }, []);

  // We need to make comparisons with the other color's timestamps so must put this code in seperate useEffects in order to get their updated values
  // Handling orange click updates
  useEffect(() => {
    if (orangeClickTimestampData.length > orangeClickTimestamps.length) {
      setOrangeClickTimestamps((orangeClickTimestamps) => [
        ...orangeClickTimestamps,
        Date.now(),
      ]);

      if (orangeClickTimestampData.length + blueClickTimestamps.length === 1) {
        // Means it's the first click coming in, so start the timer in the component

        setupTimer();
      }
    }
  }, [
    blueClickTimestamps.length,
    orangeClickTimestampData,
    orangeClickTimestamps.length,
    setupTimer,
  ]);

  // Similar to above - handling blue click updates
  useEffect(() => {
    if (blueClickTimestampData.length > blueClickTimestamps.length) {
      setBlueClickTimestamps((blueClickTimestamps) => [
        ...blueClickTimestamps,
        Date.now(),
      ]);

      if (orangeClickTimestamps.length + blueClickTimestampData.length === 1) {
        setupTimer();
      }
    }
  }, [
    blueClickTimestampData.length,
    blueClickTimestamps.length,
    orangeClickTimestamps.length,
    setupTimer,
  ]);

  return {
    isLoading,
    loadingError,
    orangeClickTimestamps,
    blueClickTimestamps,
    isGameFinished,
    startingTime,
  };
};

export default useInitDashboard;
