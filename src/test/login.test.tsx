/* eslint-disable max-lines-per-function */
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { describe, it } from 'vitest';
import { Login } from '../pages/login/login';

describe('Email input component', () => {
  const testCases = [
    { input: 'invalidgmail.com', expectedError: 'Invalid e-mail format' },
    { input: 'user@domain', expectedError: 'Invalid e-mail format' },
  ];

  testCases.forEach(({ input, expectedError }) => {
    it('displays an error message when email does not match email pattern', async () => {
      render(
        <BrowserRouter>
          <Login />
        </BrowserRouter>
      );

      const inputElement = screen.getByPlaceholderText(/E-mail/i);
      fireEvent.change(inputElement, { target: { value: input } });

      await waitFor(() => {
        expect(screen.getByDisplayValue(input)).toBeInTheDocument();
        expect(screen.getByText(expectedError)).toBeInTheDocument();
      });
    });
  });

  it('displays an error message when email is empty', async () => {
    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );

    const emailInput = screen.getByPlaceholderText(/E-mail/i);
    fireEvent.change(emailInput, { target: { value: 'test@gmail.com' } });

    await waitFor(() => {
      expect(screen.getByDisplayValue('test@gmail.com')).toBeInTheDocument();
    });

    fireEvent.change(emailInput, { target: { value: '' } });

    await waitFor(() => {
      expect(screen.getByText(/E-mail is required/)).toBeInTheDocument();
    });
  });

  it('displays no error message when email is valid', async () => {
    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );

    const emailInput = screen.getByPlaceholderText(/E-mail/i);
    fireEvent.change(emailInput, { target: { value: 'test@gmail.com' } });

    await waitFor(() => {
      expect(screen.queryByText('Invalid e-mail format')).not.toBeInTheDocument();
      expect(screen.queryByText('E-mail is required')).not.toBeInTheDocument();
    });
  });
});
