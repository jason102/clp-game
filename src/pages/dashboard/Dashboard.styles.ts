import styled from 'styled-components';
import { ORANGE, BLUE } from 'Colors';

export const Container = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;
  padding-top: 50px;
`;

export const ChartContainer = styled.div`
  width: 60vw;
  height: 400px;
`;

export const ButtonCountContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

const ButtonCount = styled.div`
  padding: 30px 150px 30px 150px;
  border-radius: 10px;
  border-width: 3px;
  color: white;
  font-size: 60px;
`;

export const OrangeButtonCount = styled(ButtonCount)`
  background-color: ${ORANGE};
  margin: 50px 10px 0px 0px;
`;

export const BlueButtonCount = styled(ButtonCount)`
  background-color: ${BLUE};
  margin: 50px 0px 0px 10px;
`;
