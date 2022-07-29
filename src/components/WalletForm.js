import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { currencies } from '../redux/actions';

class WalletForm extends Component {
  async componentDidMount() {
    const { currencies: currenciesRequest } = this.props;
    await currenciesRequest();
  }

  render() {
    const { state } = this.props;
    const { wallet: { currencies: currenciesArray } } = state;
    return (
      <div>
        <form>
          <label htmlFor="value">
            Valor:
            <input
              data-testid="value-input"
              name="value"
              type="number"
            />
          </label>
          <label htmlFor="currencies">
            Moeda:
            <select
              data-testid="currency-input"
              name="currencies"
            >
              {
                currenciesArray.map((currency) => (
                  <option
                    key={ currency }
                    value={ currency }
                  >
                    {currency}
                  </option>
                ))
              }
            </select>
          </label>
          <label htmlFor="method">
            Método de pagamento:
            <select
              data-testid="method-input"
              name="method"
            >
              <option value="money">
                Dinheiro
              </option>
              <option value="creditCard">
                Cartão de crédito
              </option>
              <option value="debitCard">
                Cartão de débito
              </option>
            </select>
          </label>
          <label htmlFor="tag">
            Categoria:
            <select
              data-testid="tag-input"
              name="tag"
            >
              <option value="food">
                Alimentação
              </option>
              <option value="leisure">
                Lazer
              </option>
              <option value="work">
                Trabalho
              </option>
              <option value="transport">
                Transporte
              </option>
              <option value="health">
                Saúde
              </option>
            </select>
          </label>
          <label htmlFor="description">
            Descrição:
            <input
              data-testid="description-input"
              name="description"
              type="text"
            />
          </label>
          <button type="button">Adicionar despesa</button>
        </form>
      </div>
    );
  }
}

WalletForm.propTypes = {
  currencies: PropTypes.func.isRequired,
  state: PropTypes.shape().isRequired,
};

const mapStateToProps = (state) => ({
  state,
});

const mapDispatchToProps = (dispatch) => ({
  currencies: () => dispatch(currencies()),
});

export default connect(mapStateToProps, mapDispatchToProps)(WalletForm);
