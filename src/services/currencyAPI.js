const ENDPOINT_API = 'https://economia.awesomeapi.com.br/json/all';

const getCurrencyAPI = async () => {
  const response = await fetch(ENDPOINT_API);
  const json = await response.json();
  return json;
};

export default getCurrencyAPI;
