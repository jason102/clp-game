import { updateDoc, arrayUnion, Timestamp } from 'firebase/firestore';
import React from 'react';
import { BlueButton, Container, OrangeButton } from './Client.styles';
import useInitClient from './useInitClient';

const Client: React.FC = () => {
  const { isLoading, loadingError, latestGameRef } = useInitClient();

  const onButtonClick = (buttonColor: string) => {
    if (latestGameRef) {
      const updatedTimestampArray = arrayUnion(Timestamp.fromDate(new Date()));

      updateDoc(
        latestGameRef,
        buttonColor === 'orange'
          ? {
              orangeClicks: updatedTimestampArray,
            }
          : { blueClicks: updatedTimestampArray }
      );
    }
  };

  if (isLoading) {
    return <Container>Loading Client</Container>;
  }

  if (loadingError) {
    return <Container>{'Error loading client: ' + loadingError}</Container>;
  }

  return (
    <Container>
      <OrangeButton
        type='button'
        value='-'
        onClick={() => onButtonClick('orange')}
      />
      <BlueButton
        type='button'
        value='+'
        onClick={() => onButtonClick('blue')}
      />
    </Container>
  );
};

export default Client;
