export const GAME_TIME = 5000; // 5 seconds

export const CHART_TIME_VALUES = Array.from(
  Array(GAME_TIME / 500).keys()
).reduce(
  (accum) => (accum.length ? [...accum, accum[accum.length - 1] + 0.5] : [0.5]),
  [] as number[]
);

const getNumberOfClicksInRange = (
  rangeStart: number,
  rangeEnd: number,
  clickTimestamps: number[]
) => {
  return clickTimestamps.reduce((count, nextTimestamp) => {
    if (nextTimestamp > rangeStart && nextTimestamp <= rangeEnd) {
      return count + 1;
    }
    return count;
  }, 0);
};

export const getClicksPerHalfSecond = (
  startingTime: number,
  timestamps: number[]
) => {
  let totalFoundClickCount = 0;

  const clickMap = CHART_TIME_VALUES.reduce((accumulated, next) => {
    const rangeStart = startingTime + (next - 0.5) * 1000;
    const rangeEnd = rangeStart + 500;

    const clickCount = getNumberOfClicksInRange(
      rangeStart,
      rangeEnd,
      timestamps
    );

    accumulated[next] = clickCount;
    totalFoundClickCount += clickCount;

    return accumulated;
  }, {} as { [key: number]: number });

  // Sometimes the very first click might fall slightly outside of the range and therefore we handle it here
  if (totalFoundClickCount < timestamps.length) {
    clickMap[0.5] += 1;
  }

  return Object.values(clickMap);
};

export const noLineDataArray = Array(CHART_TIME_VALUES.length).fill(0);
