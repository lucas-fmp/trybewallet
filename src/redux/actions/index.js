// Coloque aqui suas actions

import getCurrencyAPI from '../../services/currencyAPI';

export const login = (state) => ({
  type: 'LOGIN',
  payload: state,
});

const fetchAPI = (json) => ({
  type: 'FETCH_COMPLETE',
  payload: json,
});

const requestAPI = () => ({
  type: 'REQUEST_API',
});

const failedRequest = (error) => ({
  type: 'FAILED_REQUEST',
  payload: error,
});

export function currencies() {
  return async (dispatch) => {
    dispatch(requestAPI());
    try {
      const response = await getCurrencyAPI();
      dispatch(fetchAPI(response));
    } catch (error) {
      dispatch(failedRequest(error));
    }
  };
}

export const savingInputs = (state) => ({
  type: 'SAVE_INPUTS',
  payload: state,
});

export const deletingExpense = (expenses) => ({
  type: 'DELETE_EXPENSE',
  payload: expenses,
});
