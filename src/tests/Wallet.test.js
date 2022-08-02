import React from 'react';
import { screen } from '@testing-library/react';
import { renderWithRouterAndRedux } from './helpers/renderWith'
import userEvent from '@testing-library/user-event';
import Wallet from '../pages/Wallet';

describe('The Wallet page', () => {
  it('contains the input fields', () => {
    renderWithRouterAndRedux(<Wallet />);

    const total = screen.getByTestId('total-field');
    const currency = screen.getByTestId('header-currency-field');
    const inputValue = screen.getByRole('spinbutton');
    const inputCurrency = screen.getByText(/moeda:/i);
    const inputMethod = screen.getByText(/método de pagamento:/i);
    const inputTag = screen.getByText(/categoria:/i);
    const inputDescription = screen.getByRole('textbox');
    const button = screen.getByRole('button', {  name: /adicionar despesa/i});
    const description = screen.getByRole('columnheader', {  name: /descrição/i});
    const tag = screen.getByRole('columnheader', {  name: /descrição/i});
    const method = screen.getByRole('columnheader', {  name: /descrição/i});
    const convertedValue = screen.getByRole('columnheader', {  name: /valor convertido/i});
    const conversionCurrency = screen.getByRole('columnheader', {  name: /valor convertido/i});
    const editDeleteButton = screen.getByRole('columnheader', {  name: /editar\/excluir/i});

    expect(total).toBeInTheDocument();
    expect(currency).toBeInTheDocument();
    expect(inputValue).toBeInTheDocument();
    expect(inputCurrency).toBeInTheDocument();
    expect(inputMethod).toBeInTheDocument();
    expect(inputTag).toBeInTheDocument();
    expect(inputDescription).toBeInTheDocument();
    expect(button).toBeInTheDocument();
    expect(description).toBeInTheDocument();
    expect(tag).toBeInTheDocument();
    expect(method).toBeInTheDocument();
    expect(convertedValue).toBeInTheDocument();
    expect(conversionCurrency).toBeInTheDocument();
    expect(editDeleteButton).toBeInTheDocument();
  });

  it('contains the expense info', () => {
    renderWithRouterAndRedux(<Wallet />);

    const inputValue = screen.getByRole('spinbutton');
    const inputDescription = screen.getByRole('textbox');
    const button = screen.getByRole('button', {  name: /adicionar despesa/i});

    userEvent.type(inputValue, 1);
    userEvent.type(inputDescription, 'one dollar');
    userEvent.click(button);

    const food = screen.getByRole('cell', {  name: /alimentação/i});
    const money = screen.getByRole('cell', {  name: /dinheiro/i});

    expect(food).toBeInTheDocument();
    expect(money).toBeInTheDocument();
  });
});