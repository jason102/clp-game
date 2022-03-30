import { getClicksPerHalfSecond } from 'helpers';

describe('getClicksPerHalfSecond', () => {
  it('should return an array storing the number of clicks per half second given a starting time and an array of timestamps in milliseconds', () => {
    const timestampsMock = [
      1648602553132, 1648602553205, 1648602554723, 1648602555352,
    ];
    const startingTimeMock = 1648602553131;
    const resultingArray = [2, 0, 0, 1, 1, 0, 0, 0, 0, 0];

    const clicksPerHalfSecond = getClicksPerHalfSecond(
      startingTimeMock,
      timestampsMock
    );

    expect(clicksPerHalfSecond).toEqual(resultingArray);
  });

  it('should add 1 click to the first half second array element when a first click timestamp is just before the game starting time', () => {
    const timestampsMock = [
      1648602553128, 1648602553205, 1648602554723, 1648602555352,
    ]; // first timestamp is less than the startingTimeMock
    const startingTimeMock = 1648602553131;
    const resultingArray = [2, 0, 0, 1, 1, 0, 0, 0, 0, 0];

    const clicksPerHalfSecond = getClicksPerHalfSecond(
      startingTimeMock,
      timestampsMock
    );

    expect(clicksPerHalfSecond).toEqual(resultingArray);
  });
});
