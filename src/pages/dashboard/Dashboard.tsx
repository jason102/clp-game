import React from 'react';
import Chart from './Chart';
import {
  Container,
  OrangeButtonCount,
  BlueButtonCount,
  ButtonCountContainer,
} from './Dashboard.styles';
import useInitDashboard from './useInitDashboard';

const Dashboard: React.FC = () => {
  const {
    isLoading,
    loadingError,
    orangeClickTimestamps,
    blueClickTimestamps,
  } = useInitDashboard();

  if (isLoading) {
    return <Container>Loading Dashboard</Container>;
  }

  if (loadingError) {
    return <Container>{'Error loading dashboard: ' + loadingError}</Container>;
  }

  return (
    <Container>
      <Chart />
      <ButtonCountContainer>
        <OrangeButtonCount>{orangeClickTimestamps.length}</OrangeButtonCount>
        <BlueButtonCount>{blueClickTimestamps.length}</BlueButtonCount>
      </ButtonCountContainer>
    </Container>
  );
};

export default Dashboard;
