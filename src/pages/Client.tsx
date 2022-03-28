import React from 'react';
import { BlueButton, Container, OrangeButton } from './Client.styles';

const Client: React.FC = () => {
  return (
    <Container>
      <OrangeButton type='button' value='-' />
      <BlueButton type='button' value='+' />
    </Container>
  );
};

export default Client;
