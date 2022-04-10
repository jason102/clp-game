import { useEffect, useState, useRef, useCallback } from 'react';
import { blueClicksDocRef, orangeClicksDocRef } from 'firebaseConfig';
import { setDoc, onSnapshot, Unsubscribe } from 'firebase/firestore';
import { GAME_TIME, getClicksPerHalfSecond, noLineDataArray } from 'helpers';
import { GraphData } from './Chart';

const useSetupGame = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [loadingError, setLoadingError] = useState('');

  const [orangeClickCount, setOrangeClickCount] = useState(0);
  const [blueClickCount, setBlueClickCount] = useState(0);
  const orangeClickTimestamps = useRef<number[]>([]);
  const blueClickTimestamps = useRef<number[]>([]);

  const [graphData, setGraphData] = useState<GraphData>({
    blackLineValues: noLineDataArray,
    orangeLineValues: noLineDataArray,
    blueLineValues: noLineDataArray,
  });

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

  const determineGameResults = useCallback(() => {
    const blackLineValues = getClicksPerHalfSecond(startingTime.current, [
      ...orangeClickTimestamps.current,
      ...blueClickTimestamps.current,
    ]);

    const orangeLineValues = getClicksPerHalfSecond(
      startingTime.current,
      orangeClickTimestamps.current
    );

    const blueLineValues = getClicksPerHalfSecond(
      startingTime.current,
      blueClickTimestamps.current
    );

    setGraphData({
      blackLineValues,
      orangeLineValues,
      blueLineValues,
    });

    unsubscribeFromDatabaseUpdates();
  }, []);

  const setupTimer = useCallback(
    (now: number) => {
      if (
        blueClickTimestamps.current.length +
          orangeClickTimestamps.current.length ===
        1
      ) {
        // Means it's the first click coming in, so start the timer in the component
        startingTime.current = now;
        setTimeout(determineGameResults, GAME_TIME);
      }
    },
    [determineGameResults]
  );

  const setupDatabase = useCallback(async () => {
    try {
      // Clear the clicks of the previous game
      await Promise.all([
        setDoc(orangeClicksDocRef, {
          clicks: 0,
        }),
        setDoc(blueClicksDocRef, {
          clicks: 0,
        }),
      ]);

      // Then listen to blue click updates from the client
      blueButtonUnsubscribeRef.current = onSnapshot(
        blueClicksDocRef,
        (snapshot) => {
          const { clicks } = snapshot.data() as {
            clicks: number;
          };

          // This code runs even when clicks === 0 so must skip this first event
          if (clicks > 0) {
            const now = Date.now();
            blueClickTimestamps.current.push(now);

            setupTimer(now);

            setBlueClickCount(clicks);
          }
        }
      );

      // Orange click updates
      orangeButtonUnsubscribeRef.current = onSnapshot(
        orangeClicksDocRef,
        (snapshot) => {
          const { clicks } = snapshot.data() as {
            clicks: number;
          };

          if (clicks > 0) {
            const now = Date.now();
            orangeClickTimestamps.current.push(now);

            setupTimer(now);

            setOrangeClickCount(clicks);
          }
        }
      );
    } catch (e: any) {
      setLoadingError(e);
    }

    setIsLoading(false);
  }, [setupTimer]);

  // Set up a new game
  useEffect(() => {
    setupDatabase();

    return () => unsubscribeFromDatabaseUpdates();
  }, [setupDatabase]);

  return {
    isLoading,
    loadingError,
    orangeClickCount,
    blueClickCount,
    graphData,
  };
};

export default useSetupGame;
