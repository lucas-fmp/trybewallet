import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { login } from '../redux/actions';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      buttonState: true,
    };
  }

  veryfingEmail = () => {
    const { email, password } = this.state;
    const minPasswordCharacters = 6;
    const minDomainCharacters = 3;
    const notFound = -1;
    const beforeTheAtSign = email.substring(0, email.indexOf('@'));
    const afterTheAtSign = email.substring(email.indexOf('@') + 1, email.length);
    if (
      (beforeTheAtSign.length >= 1)
      && (afterTheAtSign.length >= minDomainCharacters)
      && (beforeTheAtSign.search('@') === notFound)
      && (afterTheAtSign.search('@') === notFound)
      && (beforeTheAtSign.search(' ') === notFound)
      && (afterTheAtSign.search(' ') === notFound)
      && (afterTheAtSign.search('.') !== notFound)
      && (afterTheAtSign.indexOf('.') >= 1)
      && (afterTheAtSign.lastIndexOf('.') < afterTheAtSign.length - 1)
      && (password.length >= minPasswordCharacters)
    ) {
      this.setState({ buttonState: false });
    } else {
      this.setState({ buttonState: true });
    }
  }

  inputHandle = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    }, () => this.veryfingEmail());
  }

  render() {
    const { email, password, buttonState } = this.state;
    const { login: loginDispatch, history } = this.props;
    return (
      <div>
        <form>
          <label htmlFor="email">
            Email
            <input
              data-testid="email-input"
              type="email"
              name="email"
              value={ email }
              onChange={ this.inputHandle }
            />
          </label>
          <label htmlFor="password">
            Senha
            <input
              data-testid="password-input"
              type="password"
              name="password"
              value={ password }
              onChange={ this.inputHandle }
            />
          </label>
          <button
            type="button"
            disabled={ buttonState }
            onClick={ () => {
              loginDispatch(this.state);
              history.push('/carteira');
            } }
          >
            Entrar
          </button>
          {
            buttonState && <p>Digite um email e uma senha válidos</p>
          }
        </form>
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  login: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  login: (state) => dispatch(login(state)),
});

export default connect(null, mapDispatchToProps)(Login);
