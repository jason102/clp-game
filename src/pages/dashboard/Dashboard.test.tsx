import { render, waitFor, act, screen } from '@testing-library/react';
import Dashboard from './Dashboard';
import * as firebase from 'firebase/firestore';
import * as helpers from 'helpers';
import { BLUE, ORANGE } from 'Colors';

jest.mock('firebaseConfig', () => ({
  blueClicksDocRef: 'blueClicksDocRef',
  orangeClicksDocRef: 'orangeClicksDocRef',
}));
jest.mock('firebase/firestore');

const echartsSpy = jest.fn();
jest.mock('echarts/core', () => ({
  use: jest.fn(),
  init: () => ({
    setOption: echartsSpy,
  }),
}));

jest.mock('echarts/charts', () => ({}));
jest.mock('echarts/components', () => ({}));
jest.mock('echarts/features', () => ({}));
jest.mock('echarts/renderers', () => ({}));

describe('Dashboard page', () => {
  beforeEach(() => {
    jest.resetAllMocks();

    jest.spyOn(firebase, 'writeBatch').mockImplementation(() => ({
      update: jest.fn(),
      set: jest.fn(),
      commit: jest.fn(),
      delete: jest.fn(),
    }));
  });

  it('renders the loading state and dashboard when loading is successful', async () => {
    const { asFragment } = render(<Dashboard />);

    // waitFor is needed as there's a promise that needs resolving in the first useEffect (Promise.all(...))
    await waitFor(() => {
      // Loading state snapshot
      expect(asFragment()).toMatchInlineSnapshot(`
        <DocumentFragment>
          <div
            class="sc-bczRLJ fptUTC"
          >
            Loading Dashboard
          </div>
        </DocumentFragment>
      `);
    });

    // Finished loading state snapshot
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders an error when resetting the game fails', async () => {
    jest.spyOn(firebase, 'writeBatch').mockImplementation(() => ({
      update: jest.fn(),
      set: jest.fn(),
      commit: () => {
        throw 'firebase string-only error yikes';
      },
      delete: jest.fn(),
    }));

    const { asFragment } = render(<Dashboard />);

    await waitFor(() => {
      expect(asFragment()).toMatchInlineSnapshot(`
        <DocumentFragment>
          <div
            class="sc-bczRLJ fptUTC"
          >
            Error loading dashboard: firebase string-only error yikes
          </div>
        </DocumentFragment>
      `);
    });
  });

  it('should show updated count values when onSnapshot fires', async () => {
    jest
      .spyOn(firebase, 'onSnapshot')
      .mockImplementationOnce((_, onNext) => {
        // @ts-ignore:
        onNext({ data: () => ({ clicks: 1 }) }); // blue clicks

        return jest.fn();
      })
      .mockImplementationOnce((_, onNext) => {
        // @ts-ignore:
        onNext({ data: () => ({ clicks: 2 }) }); // orange clicks

        return jest.fn();
      });

    render(<Dashboard />);

    await waitFor(() => {
      const blueClickCount = screen.getByText(1);
      const orangeClickCount = screen.getByText(2);

      expect(orangeClickCount).toBeInTheDocument();
      expect(orangeClickCount).toHaveStyle(`background-color: ${ORANGE}`);
      expect(blueClickCount).toBeInTheDocument();
      expect(blueClickCount).toHaveStyle(`background-color: ${BLUE}`);
    });
  });

  it('should call echarts setOption() to draw the graph after 5 seconds with click data', async () => {
    jest
      .spyOn(firebase, 'onSnapshot')
      .mockImplementationOnce((_, onNext) => {
        // @ts-ignore:
        onNext({ data: () => ({ clicks: 1 }) }); // blue clicks

        return jest.fn();
      })
      .mockImplementationOnce((_, onNext) => {
        setTimeout(() => {
          // @ts-ignore:
          onNext({ data: () => ({ clicks: 1 }) }); // orange clicks
        }, 3000); // fire an orange click after 3 seconds

        return jest.fn();
      });

    const blackClicks = [0, 0, 0, 0, 0, 1, 0, 0, 1, 0];
    const orangeClicks = [0, 0, 0, 0, 0, 0, 0, 0, 1, 0];
    const blueClicks = [0, 0, 0, 0, 0, 1, 0, 0, 0, 0];
    jest
      .spyOn(helpers, 'getClicksPerHalfSecond')
      .mockImplementationOnce(() => blackClicks)
      .mockImplementationOnce(() => orangeClicks)
      .mockImplementationOnce(() => blueClicks);

    jest.useFakeTimers();

    render(<Dashboard />);

    // Need to use act() due to multiple renders being triggered
    await act(async () => {
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      await waitFor(() => {}); // pass the await batchOperation.commit()

      jest.advanceTimersByTime(9001); // end the game after 5 seconds
    });

    expect(echartsSpy).toHaveBeenCalledWith({
      grid: { containLabel: true, left: '3%', right: '13%' },
      legend: {},
      series: [
        {
          color: 'black',
          data: blackClicks,
          name: 'Total Clicks',
          smooth: true,
          type: 'line',
        },
        {
          color: '#ff9559',
          data: orangeClicks,
          name: 'Orange',
          smooth: true,
          type: 'line',
        },
        {
          color: '#007aff',
          data: blueClicks,
          name: 'Blue',
          smooth: true,
          type: 'line',
        },
      ],
      tooltip: { trigger: 'axis' },
      xAxis: {
        axisLabel: { showMaxLabel: true, showMinLabel: true },
        boundaryGap: true,
        data: [0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5],
        name: 'Seconds',
        type: 'category',
      },
      yAxis: { name: 'Clicks', type: 'value' },
    });

    jest.useRealTimers();
  });
});
