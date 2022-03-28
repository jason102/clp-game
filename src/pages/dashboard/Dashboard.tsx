import React, { useEffect } from 'react';
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
    isGameFinished,
  } = useInitDashboard();

  useEffect(() => {
    if (isGameFinished) {
      // set the chart values
    }
  }, [isGameFinished]);

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
