// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  isFetching: false,
};

const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case 'REQUEST_API':
    return {
      ...state,
      isFetching: true,
    };
  case 'FETCH_COMPLETE':
    return {
      ...state,
      currencies: Object.keys(action.payload).filter((currency) => currency !== 'USDT'),
      isFetching: false,
    };
  case 'FAILED_REQUEST':
    return {
      ...state,
      error: action.payload,
      isFetching: false,
    };
  default:
    return state;
  }
};

export default wallet;
