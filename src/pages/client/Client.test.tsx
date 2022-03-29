import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Client from './Client';
import * as firebase from 'firebase/firestore';

jest.mock('firebase/firestore');
jest.mock('firebaseConfig', () => ({
  blueClicksDocRef: 'blueClicksDocRef',
  orangeClicksDocRef: 'orangeClicksDocRef',
}));

describe('Client page', () => {
  let spy: jest.SpyInstance<any>;

  beforeEach(() => {
    jest.resetAllMocks();
    spy = jest.spyOn(firebase, 'updateDoc');
  });

  it('renders', () => {
    const { asFragment } = render(<Client />);
    expect(asFragment()).toMatchInlineSnapshot(`
      <DocumentFragment>
        <div
          class="sc-bczRLJ hhjSAF"
        >
          <input
            class="sc-gsnTZi sc-dkzDqf jAlqhj jAvpVx"
            type="button"
            value="-"
          />
          <input
            class="sc-gsnTZi sc-hKMtZM jAlqhj jhlyhI"
            type="button"
            value="+"
          />
        </div>
      </DocumentFragment>
    `);
  });

  it('should increment the orange click count when the orange button is pressed', () => {
    render(<Client />);

    const orangeButton = screen.getByRole('button', {
      name: '-',
    });
    userEvent.click(orangeButton);

    expect(spy).toHaveBeenCalledWith('orangeClicksDocRef', {
      clicks: undefined,
    });
    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('should increment the blue click count when the blue button is pressed', () => {
    render(<Client />);

    const orangeButton = screen.getByRole('button', {
      name: '+',
    });
    userEvent.click(orangeButton);

    expect(spy).toHaveBeenCalledWith('blueClicksDocRef', {
      clicks: undefined,
    });
    expect(spy).toHaveBeenCalledTimes(1);
  });
});
