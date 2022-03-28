import styled from 'styled-components';
import { ORANGE, BLUE } from 'Colors';

export const Container = styled.div`
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;
  flex-direction: row;
`;

const Button = styled.input`
  padding: 30px 150px 30px 150px;
  border-radius: 10px;
  border-width: 3px;
  color: white;
  font-size: 60px;
`;

export const OrangeButton = styled(Button)`
  background-color: ${ORANGE};
  margin: 50px 10px 0px 0px;
`;

export const BlueButton = styled(Button)`
  background-color: ${BLUE};
  margin: 50px 0px 0px 10px;
`;
