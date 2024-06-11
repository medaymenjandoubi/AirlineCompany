import axios from 'axios';

export const getExchangeRates = async () => {
  try {
    const response = await axios.get('https://open.er-api.com/v6/latest/TND');
    return response
  } catch (error) {
    console.error('Error fetching exchange rates:', error);
    return null;
  }
};
