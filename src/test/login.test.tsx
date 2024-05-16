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

describe('Password input component', () => {
  const testCases = [
    { input: '1234567', expectedError: 'Password must be at least 8 characters long' },
    { input: '12345678', expectedError: 'Password must contain at least one uppercase letter (A-Z)' },
    { input: '1234567A', expectedError: 'Password must contain at least one lowercase letter (a-z)' },
    { input: '123456Aa', expectedError: 'Password must contain at least one special character (e.g., !@#$%^&*)' },
    { input: 'Aaaaaaaa', expectedError: 'Password must contain at least one digit (0-9)' },
    { input: '123 5Aa!', expectedError: 'Password cannot contain leading or trailing whitespace' },
  ];

  testCases.forEach(({ input, expectedError }) => {
    it('displays an error message when email does not match email pattern', async () => {
      render(
        <BrowserRouter>
          <Login />
        </BrowserRouter>
      );

      const inputElement = screen.getByPlaceholderText(/Password/i);
      fireEvent.change(inputElement, { target: { value: input } });

      await waitFor(() => {
        expect(screen.getByDisplayValue(input)).toBeInTheDocument();
        expect(screen.getByText(expectedError)).toBeInTheDocument();
      });
    });
  });

  it('displays an error message when password is empty', async () => {
    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );

    const emailInput = screen.getByPlaceholderText(/Password/i);
    fireEvent.change(emailInput, { target: { value: '12345Aa!' } });

    await waitFor(() => {
      expect(screen.getByDisplayValue('12345Aa!')).toBeInTheDocument();
    });

    fireEvent.change(emailInput, { target: { value: '' } });

    await waitFor(() => {
      expect(screen.getByText(/Password is required/)).toBeInTheDocument();
    });
  });

  it('displays no error message when password is valid', async () => {
    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );

    const emailInput = screen.getByPlaceholderText(/Password/i);
    fireEvent.change(emailInput, { target: { value: '12345Aa!' } });

    await waitFor(() => {
      expect(screen.queryByText('Password must be at least 8 characters long')).not.toBeInTheDocument();
      expect(screen.queryByText('Password must contain at least one uppercase letter (A-Z)')).not.toBeInTheDocument();
      expect(screen.queryByText('Password must contain at least one lowercase letter (a-z)')).not.toBeInTheDocument();
      expect(
        screen.queryByText('Password must contain at least one special character (e.g., !@#$%^&*)')
      ).not.toBeInTheDocument();
      expect(screen.queryByText('Password must contain at least one digit (0-9)')).not.toBeInTheDocument();
      expect(screen.queryByText('Password cannot contain leading or trailing whitespace')).not.toBeInTheDocument();
    });
  });
});
