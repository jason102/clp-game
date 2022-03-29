import React from 'react';
import Chart from './Chart';
import {
  Container,
  OrangeButtonCount,
  BlueButtonCount,
  ButtonCountContainer,
} from './Dashboard.styles';
import useSetupGame from './useSetupGame';

const Dashboard: React.FC = () => {
  const {
    isLoading,
    loadingError,
    orangeClickTimestamps,
    blueClickTimestamps,
    graphData,
  } = useSetupGame();

  if (isLoading) {
    return <Container>Loading Dashboard</Container>;
  }

  if (loadingError) {
    return <Container>{'Error loading dashboard: ' + loadingError}</Container>;
  }

  return (
    <Container>
      <Chart graphData={graphData} />
      <ButtonCountContainer>
        <OrangeButtonCount>{orangeClickTimestamps.length}</OrangeButtonCount>
        <BlueButtonCount>{blueClickTimestamps.length}</BlueButtonCount>
      </ButtonCountContainer>
      <p>
        {`To play the game, you must `}
        <a href='/client' target='_blank'>
          open this page
        </a>
      </p>
    </Container>
  );
};

export default Dashboard;
