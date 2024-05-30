import { ToastProvider } from '@contexts/toastProvider';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { describe, it } from 'vitest';
import { Login } from '../pages/login/login';
import { Registration } from '../pages/registration/registration';
import { InputEmailErrors, InputPasswordErrors } from '../utils/validationConst';

[<Registration key="registration" />, <Login key="login" />].forEach(component => {
  describe('Email input component', () => {
    const testCases = [
      { input: 'invalidgmail.com', expectedError: InputEmailErrors.pattern },
      { input: 'user@domain', expectedError: InputEmailErrors.pattern },
      { input: ' test@gmail.com', expectedError: InputEmailErrors.pattern },
      { input: 'test@gmail.com ', expectedError: InputEmailErrors.pattern },
    ];

    testCases.forEach(({ input, expectedError }) => {
      it('displays an error message when email does not match email pattern', async () => {
        render(
          <BrowserRouter>
            <ToastProvider>{component}</ToastProvider>
          </BrowserRouter>
        );

        const inputElement = screen.getByLabelText(/E-mail/);
        const button = screen.getByText('Submit', { selector: 'button[type="submit"]' });

        fireEvent.change(inputElement, { target: { value: input } });

        await waitFor(() => {
          expect(screen.getByDisplayValue(input.trim())).toBeInTheDocument();
          expect(screen.getByText(expectedError)).toBeInTheDocument();
          expect(button).toBeDisabled();
        });
      });
    });

    it('displays an error message when email is empty', async () => {
      render(
        <BrowserRouter>
          <ToastProvider>{component}</ToastProvider>
        </BrowserRouter>
      );

      const inputElement = screen.getByLabelText(/E-mail/);
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
        expect(screen.getByText(InputEmailErrors.required)).toBeInTheDocument();
        expect(button).toBeDisabled();
      });
    });
  });

  describe('Password input component', () => {
    const testCases = [
      { input: '1234567', expectedError: InputPasswordErrors.minLength },
      { input: '12345678', expectedError: InputPasswordErrors.uppercase },
      { input: '1234567A', expectedError: InputPasswordErrors.lowercase },
      { input: '123456Aa', expectedError: InputPasswordErrors.specialChar },
      { input: 'Aaaaaaaa', expectedError: InputPasswordErrors.digit },
      { input: '123 5Aa!', expectedError: InputPasswordErrors.noWhitespace },
      { input: '1235Aa! ', expectedError: InputPasswordErrors.noWhitespace },
      { input: ' 1235Aa!', expectedError: InputPasswordErrors.noWhitespace },
    ];

    testCases.forEach(({ input, expectedError }) => {
      it('displays an error message when password does not match password pattern', async () => {
        render(
          <BrowserRouter>
            <ToastProvider>{component}</ToastProvider>
          </BrowserRouter>
        );

        const inputElement = screen.getByLabelText(/Password/);
        const button = screen.getByText('Submit', { selector: 'button[type="submit"]' });
        fireEvent.change(inputElement, { target: { value: input } });

        await waitFor(() => {
          expect(screen.getByDisplayValue(input.trim())).toBeInTheDocument();
          expect(screen.getByText(expectedError)).toBeInTheDocument();
          expect(button).toBeDisabled();
        });
      });
    });

    it('displays an error message when password is empty', async () => {
      render(
        <BrowserRouter>
          <ToastProvider>{component}</ToastProvider>
        </BrowserRouter>
      );

      const inputElement = screen.getByLabelText(/Password/);
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
        expect(screen.getByText(InputPasswordErrors.required)).toBeInTheDocument();
        expect(button).toBeDisabled();
      });
    });
  });
});
