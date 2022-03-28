import { updateDoc, arrayUnion, Timestamp } from 'firebase/firestore';
import { gameDocRef } from 'firebaseConfig';
import React from 'react';
import { BlueButton, Container, OrangeButton } from './Client.styles';

const Client: React.FC = () => {
  const onButtonClick = (buttonColor: string) => {
    const updatedTimestampArray = arrayUnion(Timestamp.fromDate(new Date()));

    updateDoc(
      gameDocRef,
      buttonColor === 'orange'
        ? {
            orangeClicks: updatedTimestampArray,
          }
        : { blueClicks: updatedTimestampArray }
    );
  };

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
