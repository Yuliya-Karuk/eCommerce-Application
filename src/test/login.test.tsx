/* eslint-disable max-lines-per-function */
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { describe, it } from 'vitest';
import { Login } from '../pages/login/login';

describe('Login component', () => {
  it('Submit button is enabled, when login and password inputs are correct', async () => {
    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );

    const emailInput = screen.getByLabelText(/E-mail/);
    fireEvent.change(emailInput, { target: { value: 'test@gmail.com' } });
    const passwordInput = screen.getByLabelText(/Password/);
    fireEvent.change(passwordInput, { target: { value: '12345Aa!' } });
    const button = screen.getByText('Submit', { selector: 'button[type="submit"]' });

    await waitFor(() => {
      expect(button).not.toBeDisabled();
    });
  });
});
