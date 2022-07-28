import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';

class Header extends Component {
  render() {
    const { state } = this.props;
    const { user: { email } } = state;
    return (
      <div>
        <p data-testid="email-field">{email}</p>
        <p data-testid="total-field">0</p>
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
  }).isRequired,
};

const mapStateToProps = (state) => ({
  state,
});

export default connect(mapStateToProps)(Header);
