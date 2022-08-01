import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';

class Header extends Component {
  totalSum = () => {
    let sum = 0;
    const { state } = this.props;
    const { wallet: { expenses } } = state;
    if (expenses.length === 0) {
      return 0;
    }
    expenses
      .map((expense) => [expense.value, expense.currency, expense.exchangeRates])
      .forEach((array) => {
        console.log(array);
        const object = array[2][array[1]];
        const value = array[0];
        console.log(object);
        const { ask } = object;
        const multiply = ask * value;
        sum += multiply;
        return sum;
      });
    return sum.toFixed(2);
  }

  render() {
    const { state } = this.props;
    const { user: { email } } = state;
    return (
      <div>
        <p data-testid="email-field">{email}</p>
        <p data-testid="total-field">{this.totalSum()}</p>
        <p data-testid="header-currency-field">BRL</p>
      </div>
    );
  }
}

Header.propTypes = {
  state: PropTypes.shape({
    user: PropTypes.shape({
      email: PropTypes.string,
    }),
    wallet: PropTypes.shape(),
  }).isRequired,
};

const mapStateToProps = (state) => ({
  state,
});

export default connect(mapStateToProps)(Header);
