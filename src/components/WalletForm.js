import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { currencies, savingInputs } from '../redux/actions';
import getCurrencyAPI from '../services/currencyAPI';

const Alimentação = 'Alimentação';

class WalletForm extends Component {
  constructor() {
    super();
    this.state = {
      id: 0,
      value: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: Alimentação,
      description: '',
      exchangeRates: [],
    };
  }

  async componentDidMount() {
    const { currencies: currenciesRequest } = this.props;
    await currenciesRequest();
  }

  onChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  }

  onClick = async () => {
    const requestingAPI = await getCurrencyAPI();
    const { saveInputs } = this.props;
    const { id } = this.state;
    this.setState({ exchangeRates: requestingAPI });
    saveInputs(this.state);
    let nextId = id;
    nextId += 1;
    this.setState({
      value: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: Alimentação,
      description: '',
      id: nextId,
      exchangeRates: [],
    });
  }

  render() {
    const { state } = this.props;
    const { wallet: { currencies: currenciesArray } } = state;
    const { value, currency: currencyState, method, tag, description } = this.state;
    return (
      <div>
        <form>
          <label htmlFor="value">
            Valor:
            <input
              data-testid="value-input"
              name="value"
              type="number"
              value={ value }
              onChange={ this.onChange }
            />
          </label>
          <label htmlFor="currencies">
            Moeda:
            <select
              data-testid="currency-input"
              name="currency"
              value={ currencyState }
              onChange={ this.onChange }
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
              value={ method }
              onChange={ this.onChange }
            >
              <option value="Dinheiro">
                Dinheiro
              </option>
              <option value="Cartão de crédito">
                Cartão de crédito
              </option>
              <option value="Cartão de débito">
                Cartão de débito
              </option>
            </select>
          </label>
          <label htmlFor="tag">
            Categoria:
            <select
              data-testid="tag-input"
              name="tag"
              value={ tag }
              onChange={ this.onChange }
            >
              <option value={ Alimentação }>
                Alimentação
              </option>
              <option value="Lazer">
                Lazer
              </option>
              <option value="Trabalho">
                Trabalho
              </option>
              <option value="Transporte">
                Transporte
              </option>
              <option value="Saúde">
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
              value={ description }
              onChange={ this.onChange }
            />
          </label>
          <button
            type="button"
            onClick={ this.onClick }
          >
            Adicionar despesa
          </button>
        </form>
      </div>
    );
  }
}

WalletForm.propTypes = {
  currencies: PropTypes.func.isRequired,
  saveInputs: PropTypes.func.isRequired,
  state: PropTypes.shape().isRequired,
};

const mapStateToProps = (state) => ({
  state,
});

const mapDispatchToProps = (dispatch) => ({
  currencies: () => dispatch(currencies()),
  saveInputs: (state) => dispatch(savingInputs(state)),
});

export default connect(mapStateToProps, mapDispatchToProps)(WalletForm);
