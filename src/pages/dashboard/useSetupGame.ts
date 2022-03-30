import { useEffect, useState, useRef, useCallback } from 'react';
import { blueClicksDocRef, orangeClicksDocRef } from 'firebaseConfig';
import { setDoc, onSnapshot, Unsubscribe } from 'firebase/firestore';
import { GAME_TIME, getClicksPerHalfSecond, noLineDataArray } from 'helpers';
import { GraphData } from './Chart';

const useSetupGame = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [loadingError, setLoadingError] = useState('');
  const [orangeClickDBCount, setOrangeClickDBCount] = useState(0);
  const [blueClickDBCount, setBlueClickDBCount] = useState(0);
  const [orangeClickTimestamps, setOrangeClickTimestamps] = useState<number[]>(
    []
  );
  const [blueClickTimestamps, setBlueClickTimestamps] = useState<number[]>([]);
  const [isGameFinished, setIsGameFinished] = useState(false);
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

  const setupTimer = useCallback((now: number) => {
    // Means it's the first click coming in, so start the timer in the component
    startingTime.current = now;

    setTimeout(() => {
      setIsGameFinished(true);

      unsubscribeFromDatabaseUpdates();
    }, GAME_TIME);
  }, []);

  // Set up a new game
  useEffect(() => {
    const setupDatabase = async () => {
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
        // Note that due to the problem of closures (we need the latest values of other state data), the code for handling these updates from the listeners are in separate useEffects below
        blueButtonUnsubscribeRef.current = onSnapshot(
          blueClicksDocRef,
          (snapshot) => {
            const { clicks } = snapshot.data() as {
              clicks: number;
            };

            setBlueClickDBCount(clicks);
          }
        );

        // Orange click updates
        orangeButtonUnsubscribeRef.current = onSnapshot(
          orangeClicksDocRef,
          (snapshot) => {
            const { clicks } = snapshot.data() as {
              clicks: number;
            };

            setOrangeClickDBCount(clicks);
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
    const now = Date.now();

    if (orangeClickDBCount + blueClickTimestamps.length === 1) {
      // Means it's the first click coming in, so start the timer in the component
      setupTimer(now);
    }

    if (orangeClickDBCount > orangeClickTimestamps.length) {
      setOrangeClickTimestamps((orangeClickTimestamps) => [
        ...orangeClickTimestamps,
        now,
      ]);
    }
  }, [
    blueClickTimestamps.length,
    orangeClickDBCount,
    orangeClickTimestamps.length,
    setupTimer,
  ]);

  // Similar to above - handling blue click updates
  useEffect(() => {
    const now = Date.now();

    if (orangeClickTimestamps.length + blueClickDBCount === 1) {
      setupTimer(now);
    }

    if (blueClickDBCount > blueClickTimestamps.length) {
      setBlueClickTimestamps((blueClickTimestamps) => [
        ...blueClickTimestamps,
        now,
      ]);
    }
  }, [
    blueClickDBCount,
    blueClickTimestamps.length,
    orangeClickTimestamps.length,
    setupTimer,
  ]);

  // When the timer times out, loop through all clicks and see how many were clicked per half second
  // Then take this data in an array format suitable for the chart and update the chart with it
  useEffect(() => {
    if (isGameFinished) {
      const blackLineValues = getClicksPerHalfSecond(startingTime.current, [
        ...orangeClickTimestamps,
        ...blueClickTimestamps,
      ]);

      const orangeLineValues = getClicksPerHalfSecond(
        startingTime.current,
        orangeClickTimestamps
      );

      const blueLineValues = getClicksPerHalfSecond(
        startingTime.current,
        blueClickTimestamps
      );

      setGraphData({
        blackLineValues,
        orangeLineValues,
        blueLineValues,
      });
    }
  }, [
    blueClickTimestamps,
    isGameFinished,
    orangeClickTimestamps,
    startingTime,
  ]);

  return {
    isLoading,
    loadingError,
    orangeClickTimestamps,
    blueClickTimestamps,
    graphData,
  };
};

export default useSetupGame;
