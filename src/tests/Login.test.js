import React from 'react';
import App from '../App';
import { screen } from '@testing-library/react';
import { renderWithRouterAndRedux } from './helpers/renderWith'
import userEvent from '@testing-library/user-event';

describe('The Login page', () => {
  it('contains a login input', () => {
    renderWithRouterAndRedux(<App />);
    const emailInput = screen.getByRole('textbox');
    expect(emailInput).toBeInTheDocument();
  });

  it('contains a password input', () => {
    renderWithRouterAndRedux(<App />);
    const passwordInput = screen.getByTestId('password-input');
    expect(passwordInput).toBeInTheDocument();
  });

  it('contains a button', () => {
    renderWithRouterAndRedux(<App />);

    const button = screen.getByRole('button', {  name: /entrar/i});
    expect(button).toBeInTheDocument();
    expect(button).toBeDisabled();

    const emailInput = screen.getByRole('textbox');
    const passwordInput = screen.getByTestId('password-input');
    const text = screen.getByText(/digite um email e uma senha válidos/i);

    userEvent.type(emailInput, 'wrongemail');
    userEvent.type(passwordInput, 'wrong');
    expect(button).toBeDisabled();

    userEvent.type(emailInput, 'rightEmail@gmail.com');
    userEvent.type(passwordInput, 'goodPassword');
    expect(button).not.toBeDisabled();
    expect(text).not.toBeInTheDocument();
  });

  it('contains a text to input a valid email and password', () => {
    renderWithRouterAndRedux(<App />);
    const text = screen.getByText(/digite um email e uma senha válidos/i);
    expect(text).toBeInTheDocument();
  });
})