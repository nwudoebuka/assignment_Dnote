import * as types from './action.types';
// Prices actions
export const getPrices = () => {
  return {
    type: types.GET_PRICES
  };
};

export const responsePricesSuccessAction = (responseData: any) => {
  return {
    type: types.GET_PRICES_SUCCEEDED,
    payload: responseData,
  };
};

export const responsePricesFailedAction = (message: { error: any; }) => {
  return {
    type: types.GET_PRICES_FAILED,
    payload: message,
  };
};