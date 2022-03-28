import { updateDoc, arrayUnion, Timestamp } from 'firebase/firestore';
import { blueClicksDocRef, orangeClicksDocRef } from 'firebaseConfig';
import React from 'react';
import { BlueButton, Container, OrangeButton } from './Client.styles';

const Client: React.FC = () => {
  const onBlueButtonClicked = () => {
    const updatedTimestampArray = arrayUnion(Timestamp.fromDate(new Date()));

    updateDoc(blueClicksDocRef, {
      clicks: updatedTimestampArray,
    });
  };

  const onOrangeButtonClicked = () => {
    const updatedTimestampArray = arrayUnion(Timestamp.fromDate(new Date()));

    updateDoc(orangeClicksDocRef, {
      clicks: updatedTimestampArray,
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
