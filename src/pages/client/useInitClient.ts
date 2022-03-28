import {
  query,
  collection,
  orderBy,
  limit,
  getDocs,
  DocumentReference,
  DocumentData,
} from 'firebase/firestore';
import { firestoreDB } from 'firebaseConfig';
import { useEffect, useState } from 'react';

const useInitClient = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [loadingError, setLoadingError] = useState('');
  const [latestGameRef, setLatestGameRef] =
    useState<DocumentReference<DocumentData> | null>(null);

  useEffect(() => {
    const getLatestGame = async () => {
      const gameDocRefs: DocumentReference<DocumentData>[] = [];

      try {
        const docsSnapshot = await getDocs(
          query(
            collection(firestoreDB, 'games'),
            orderBy('startTime', 'desc'),
            limit(1)
          )
        );

        docsSnapshot.forEach((doc) => {
          gameDocRefs.push(doc.ref);
        });
      } catch (e: any) {
        setLoadingError(e);
      }

      if (gameDocRefs.length === 1) {
        setLatestGameRef(gameDocRefs[0]);
      } else {
        setLoadingError('Please start a game by first opening the dashboard');
      }

      setIsLoading(false);
    };

    getLatestGame();
  }, []);

  return { isLoading, loadingError, latestGameRef };
};

export default useInitClient;
