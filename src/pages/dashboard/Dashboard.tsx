import React from 'react';
import Chart from './Chart';
import { Container } from './Dashboard.styles';
import useInitGame from './useInitGame';

const Dashboard: React.FC = () => {
  const { isLoading, loadingError } = useInitGame();

  if (isLoading) {
    return <Container>Loading Dashboard</Container>;
  }

  if (loadingError) {
    return <Container>{'Error loading dashboard: ' + loadingError}</Container>;
  }

  return (
    <Container>
      <Chart />
    </Container>
  );
};

export default Dashboard;
