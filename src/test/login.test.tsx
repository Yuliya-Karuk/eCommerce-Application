/* eslint-disable max-lines-per-function */
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { describe, it } from 'vitest';
import { Login } from '../pages/login/login';
import { EmailLoginErrors, PasswordLoginErrors } from '../utils/validationConst';

describe('Email input component', () => {
  const testCases = [
    { input: 'invalidgmail.com', expectedError: EmailLoginErrors.pattern },
    { input: 'user@domain', expectedError: EmailLoginErrors.pattern },
  ];

  testCases.forEach(({ input, expectedError }) => {
    it('displays an error message when email does not match email pattern', async () => {
      render(
        <BrowserRouter>
          <Login />
        </BrowserRouter>
      );

      const inputElement = screen.getByPlaceholderText(/E-mail/i);
      const button = screen.getByText('Submit', { selector: 'button[type="submit"]' });

      fireEvent.change(inputElement, { target: { value: input } });

      await waitFor(() => {
        expect(screen.getByDisplayValue(input)).toBeInTheDocument();
        expect(screen.getByText(expectedError)).toBeInTheDocument();
        expect(button).toBeDisabled();
      });
    });
  });

  it('displays an error message when email is empty', async () => {
    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );

    const inputElement = screen.getByPlaceholderText(/E-mail/i);
    const button = screen.getByText('Submit', { selector: 'button[type="submit"]' });
    fireEvent.change(inputElement, { target: { value: 'test@gmail.com' } });

    await waitFor(() => {
      testCases.forEach(({ expectedError }) => {
        expect(screen.queryByText(expectedError)).not.toBeInTheDocument();
      });
      expect(screen.getByDisplayValue('test@gmail.com')).toBeInTheDocument();
    });

    fireEvent.change(inputElement, { target: { value: '' } });

    await waitFor(() => {
      expect(screen.getByText(EmailLoginErrors.required)).toBeInTheDocument();
      expect(button).toBeDisabled();
    });
  });
});

describe('Password input component', () => {
  const testCases = [
    { input: '1234567', expectedError: PasswordLoginErrors.minLength },
    { input: '12345678', expectedError: PasswordLoginErrors.uppercase },
    { input: '1234567A', expectedError: PasswordLoginErrors.lowercase },
    { input: '123456Aa', expectedError: PasswordLoginErrors.specialChar },
    { input: 'Aaaaaaaa', expectedError: PasswordLoginErrors.digit },
    { input: '123 5Aa!', expectedError: PasswordLoginErrors.noWhitespace },
  ];

  testCases.forEach(({ input, expectedError }) => {
    it('displays an error message when email does not match email pattern', async () => {
      render(
        <BrowserRouter>
          <Login />
        </BrowserRouter>
      );

      const inputElement = screen.getByPlaceholderText(/Password/i);
      const button = screen.getByText('Submit', { selector: 'button[type="submit"]' });
      fireEvent.change(inputElement, { target: { value: input } });

      await waitFor(() => {
        expect(screen.getByDisplayValue(input)).toBeInTheDocument();
        expect(screen.getByText(expectedError)).toBeInTheDocument();
        expect(button).toBeDisabled();
      });
    });
  });

  it('displays an error message when password is empty', async () => {
    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );

    const inputElement = screen.getByPlaceholderText(/Password/i);
    const button = screen.getByText('Submit', { selector: 'button[type="submit"]' });
    fireEvent.change(inputElement, { target: { value: '12345Aa!' } });

    await waitFor(() => {
      testCases.forEach(({ expectedError }) => {
        expect(screen.queryByText(expectedError)).not.toBeInTheDocument();
      });
      expect(screen.getByDisplayValue('12345Aa!')).toBeInTheDocument();
    });

    fireEvent.change(inputElement, { target: { value: '' } });

    await waitFor(() => {
      expect(screen.getByText(PasswordLoginErrors.required)).toBeInTheDocument();
      expect(button).toBeDisabled();
    });
  });
});

describe('Login component', () => {
  it('Submit button is enabled, when login and password inputs are correct', async () => {
    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );

    const emailInput = screen.getByPlaceholderText(/E-mail/i);
    fireEvent.change(emailInput, { target: { value: 'test@gmail.com' } });
    const passwordInput = screen.getByPlaceholderText(/Password/i);
    fireEvent.change(passwordInput, { target: { value: '12345Aa!' } });
    const button = screen.getByText('Submit', { selector: 'button[type="submit"]' });

    await waitFor(() => {
      expect(button).not.toBeDisabled();
    });
  });
});
