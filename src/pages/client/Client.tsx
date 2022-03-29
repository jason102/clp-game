import { updateDoc, increment } from 'firebase/firestore';
import { blueClicksDocRef, orangeClicksDocRef } from 'firebaseConfig';
import React from 'react';
import { BlueButton, Container, OrangeButton } from './Client.styles';

const Client: React.FC = () => {
  const onBlueButtonClicked = () => {
    updateDoc(blueClicksDocRef, {
      clicks: increment(1),
    });
  };

  const onOrangeButtonClicked = () => {
    updateDoc(orangeClicksDocRef, {
      clicks: increment(1),
    });
  };

  return (
    <Container>
      <OrangeButton type='button' value='-' onClick={onOrangeButtonClicked} />
      <BlueButton type='button' value='+' onClick={onBlueButtonClicked} />
    </Container>
  );
};

export default Client;
