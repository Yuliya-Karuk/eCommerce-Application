/* eslint-disable max-lines-per-function */
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { describe, it } from 'vitest';
import { Registration } from '../pages/registration/registration';
import { InputEmailErrors, InputPasswordErrors } from '../utils/validationConst';

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
          <Registration />
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
        <Registration />
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
    it('displays an error message when email does not match email pattern', async () => {
      render(
        <BrowserRouter>
          <Registration />
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
        <Registration />
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

// describe('Login component', () => {
//   it('Submit button is enabled, when login and password inputs are correct', async () => {
//     render(
//       <BrowserRouter>
//         <Registration />
//       </BrowserRouter>
//     );

//     const emailInput = screen.getByLabelText(/E-mail/);
//     fireEvent.change(emailInput, { target: { value: 'test@gmail.com' } });
//     const passwordInput = screen.getByLabelText(/Password/);
//     fireEvent.change(passwordInput, { target: { value: '12345Aa!' } });
//     const button = screen.getByText('Submit', { selector: 'button[type="submit"]' });

//     await waitFor(() => {
//       expect(button).not.toBeDisabled();
//     });
//   });
// });
