import React from 'react';
import { render, fireEvent, waitFor, screen } from 'utils/test-utils';
import AsyncButton from '@/shared/components/AsyncButton';

jest.useFakeTimers();

describe('AsyncButton', () => {
  const originalError = console.error;
  beforeAll(() => {
    console.error = (...args) => {
      if (/Warning.*not wrapped in act/.test(args[0])) {
        return;
      }
      originalError.call(console, ...args);
    };
  });

  afterAll(() => {
    console.error = originalError;
  });

  it('AsyncButton should work fine', async() => {
    const props = {
      onClick: jest.fn(() => Promise.resolve()),
      children: 'test'
    };

    render(<AsyncButton {...props} />);

    fireEvent.click(screen.getByRole('button'));
    expect(screen.getByRole('button').className).toEqual('crm-btn crm-btn-loading');
    await waitFor(() => screen.getByRole('button'));

    expect(screen.getByRole('button').className).toEqual('crm-btn');


  });
});
