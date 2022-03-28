import React, { useEffect, useState } from 'react';
import Chart, { GraphData } from './Chart';
import {
  Container,
  OrangeButtonCount,
  BlueButtonCount,
  ButtonCountContainer,
} from './Dashboard.styles';
import useInitDashboard from './useInitDashboard';
import { getClicksPerHalfSecond, noLineDataArray } from 'helpers';

const Dashboard: React.FC = () => {
  const [graphData, setGraphData] = useState<GraphData>({
    blackLineValues: noLineDataArray,
    orangeLineValues: noLineDataArray,
    blueLineValues: noLineDataArray,
  });

  const {
    isLoading,
    loadingError,
    orangeClickTimestamps,
    blueClickTimestamps,
    isGameFinished,
    startingTime,
  } = useInitDashboard();

  useEffect(() => {
    if (isGameFinished) {
      // Loop through all clicks and see how many were clicked per half second
      const blackLineValues = getClicksPerHalfSecond(startingTime.current, [
        ...orangeClickTimestamps,
        ...blueClickTimestamps,
      ]);

      const orangeLineValues = getClicksPerHalfSecond(
        startingTime.current,
        orangeClickTimestamps
      );

      const blueLineValues = getClicksPerHalfSecond(
        startingTime.current,
        blueClickTimestamps
      );

      setGraphData({
        blackLineValues,
        orangeLineValues,
        blueLineValues,
      });
    }
  }, [
    blueClickTimestamps,
    isGameFinished,
    orangeClickTimestamps,
    startingTime,
  ]);

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
    </Container>
  );
};

export default Dashboard;
