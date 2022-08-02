import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { deletingExpense } from '../redux/actions';

class Table extends Component {
  onClickDelete = (expense) => {
    const { deleteExpense } = this.props;
    const { state } = this.props;
    const { wallet: { expenses } } = state;
    const newExpenses = expenses.filter((object) => object.id !== expense.id);
    deleteExpense(newExpenses);
  }

  render() {
    const { state } = this.props;
    const { wallet: { expenses } } = state;
    return (
      <div>
        <table>
          <thead>
            <tr>
              <th>Descrição</th>
              <th>Tag</th>
              <th>Método de pagamento</th>
              <th>Valor</th>
              <th>Moeda</th>
              <th>Câmbio utilizado</th>
              <th>Valor convertido</th>
              <th>Moeda de conversão</th>
              <th>Editar/Excluir</th>
            </tr>
          </thead>
          <tbody>
            {
              expenses
                .map((expense) => (
                  <tr key={ expense.id }>
                    <td>{expense.description}</td>
                    <td>{expense.tag}</td>
                    <td>{expense.method}</td>
                    <td>{parseFloat(expense.value).toFixed(2)}</td>
                    <td>
                      {
                        expense.exchangeRates[expense.currency].name
                      }
                    </td>
                    <td>
                      {
                        parseFloat(expense.exchangeRates[expense.currency].ask).toFixed(2)
                      }
                    </td>
                    <td>
                      {
                        (expense.exchangeRates[expense.currency].ask
                        * expense.value).toFixed(2)
                      }
                    </td>
                    <td>Real</td>
                    <td>
                      <button
                        type="button"
                        data-testid="edit-btn"
                      >
                        Editar
                      </button>
                      <button
                        type="button"
                        data-testid="delete-btn"
                        onClick={ () => this.onClickDelete(expense) }
                      >
                        Excluir
                      </button>
                    </td>
                  </tr>
                ))
            }
          </tbody>
        </table>
      </div>
    );
  }
}

Table.propTypes = {
  deleteExpense: PropTypes.func.isRequired,
  state: PropTypes.shape().isRequired,
};

const mapStateToProps = (state) => ({
  state,
});

const mapDispatchToProps = (dispatch) => ({
  deleteExpense: (state) => dispatch(deletingExpense(state)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Table);
