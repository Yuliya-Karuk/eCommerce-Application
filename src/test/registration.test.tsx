import { ToastProvider } from '@contexts/toastProvider';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { describe, it } from 'vitest';
import { Registration } from '../pages/registration/registration';
import { InputDateErrors, InputNameErrors } from '../utils/validationConst';

describe('Name input component', () => {
  const testCases = [
    { input: '123', expectedError: InputNameErrors.pattern },
    { input: '!@#', expectedError: InputNameErrors.pattern },
    { input: 'абвгд', expectedError: InputNameErrors.pattern },
    { input: 'hello world', expectedError: InputNameErrors.pattern },
    { input: 'áéíóú', expectedError: InputNameErrors.pattern },
  ];

  testCases.forEach(({ input, expectedError }) => {
    it('displays an error message when name does not match name pattern', async () => {
      render(
        <BrowserRouter>
          <ToastProvider>
            <Registration />
          </ToastProvider>
        </BrowserRouter>
      );

      const inputElement = screen.getByLabelText(/First name:/);
      const button = screen.getByText('Submit', { selector: 'button[type="submit"]' });

      fireEvent.change(inputElement, { target: { value: input } });

      await waitFor(() => {
        expect(screen.getByDisplayValue(input.trim())).toBeInTheDocument();
        expect(screen.getByText(expectedError)).toBeInTheDocument();
        expect(button).toBeDisabled();
      });
    });
  });

  it('displays an error message when name is empty', async () => {
    render(
      <BrowserRouter>
        <ToastProvider>
          <Registration />
        </ToastProvider>
      </BrowserRouter>
    );

    const inputElement = screen.getByLabelText(/First name:/);
    const button = screen.getByText('Submit', { selector: 'button[type="submit"]' });
    fireEvent.change(inputElement, { target: { value: 'Test' } });

    await waitFor(() => {
      testCases.forEach(({ expectedError }) => {
        expect(screen.queryByText(expectedError)).not.toBeInTheDocument();
      });
      expect(screen.getByDisplayValue('Test')).toBeInTheDocument();
    });

    fireEvent.change(inputElement, { target: { value: '' } });

    await waitFor(() => {
      expect(screen.getByText(InputNameErrors.required)).toBeInTheDocument();
      expect(button).toBeDisabled();
    });
  });
});

describe('Date input component', () => {
  it('shows error if date of birth is not provided', async () => {
    render(
      <BrowserRouter>
        <ToastProvider>
          <Registration />
        </ToastProvider>
      </BrowserRouter>
    );

    const input = screen.getByLabelText(/Date of birth:/i);
    const button = screen.getByText('Submit', { selector: 'button[type="submit"]' });
    fireEvent.change(input, { target: { value: '1995-01-01' } });

    await waitFor(() => {
      expect(screen.queryByText(InputDateErrors.required)).not.toBeInTheDocument();
      expect(screen.queryByText(InputDateErrors.minAge)).not.toBeInTheDocument();
      expect(screen.getByDisplayValue('1995-01-01')).toBeInTheDocument();
    });

    fireEvent.change(input, { target: { value: '' } });

    await waitFor(() => {
      expect(screen.getByText(InputDateErrors.required)).toBeInTheDocument();
      expect(button).toBeDisabled();
    });
  });

  it('shows error if date of birth is less than 13 years ago', async () => {
    render(
      <BrowserRouter>
        <ToastProvider>
          <Registration />
        </ToastProvider>
      </BrowserRouter>
    );

    const input = screen.getByLabelText(/Date of birth:/i);
    const button = screen.getByText('Submit', { selector: 'button[type="submit"]' });
    fireEvent.change(input, { target: { value: '2012-01-01' } });

    await waitFor(() => {
      expect(screen.getByText(InputDateErrors.minAge)).toBeInTheDocument();
      expect(button).toBeDisabled();
    });
  });
});
