import { bool } from 'yup';
import { GET_PRICES, GET_PRICES_FAILED, GET_PRICES_SUCCEEDED, GET_USER_VARIANT, SET_NUMBER_OF_IBEACONS, SET_SELECTED_PRICE, USER_VARIANT_FAILED, USER_VARIANT_SUCCEEDED } from '../actions/action.types';
import { PriceInfoDTO } from '../../services/models/user-dto';

const defaultUserVariantState:UserVariantState = {
  userVariant:{
    user_id: null,
    experiments: [],
    isFetching: false,
    error: null
  }
};

const defaultPriceState:PriceState = {
  prices: null,
  isFetching: false,
  error: null
};

export interface UserVariantState {
  userVariant:{
    user_id: null,
    experiments: [],
    isFetching: false,
    error: null
  }
};

export interface PriceState {
  prices: [PriceInfoDTO] | null,
  isFetching: false,
  error: null
};


// only receives the user variant subtree of the store.
export const userVariant = (state = defaultUserVariantState, action: any) => {
  switch (action.type) {
    case USER_VARIANT_SUCCEEDED: {
     
        return {
          userVariant: {
            user_id: action.payload.user_id,
            experiments: action.payload.experiments,
            isFetching: false,
            error: null,
          },
        };
      }
      case GET_USER_VARIANT: {
        return { ...state, isFetching: true, error: null };
      }
      case USER_VARIANT_FAILED: {
        return { ...state, isFetching: false, error: action.payload.error };
      }
      default: {
        return {
          ...state,
          isFetching: false,
          error: null
        };
    }
  }
};

export const prices = (state = defaultPriceState, action: any) => {
  switch (action.type) {
    case GET_PRICES_SUCCEEDED: {
        return {
          ...state,
          prices: action.payload,
          isFetching: false,
          error: null
        };
      }
      case GET_PRICES: {
        return { ...state, isFetching: true, error: null };
      }
      case GET_PRICES_FAILED: {
        return { ...state, isFetching: false, error: action.payload.error };
      }
      case SET_SELECTED_PRICE: {
        return {
          ...state,
          selectedPrice: action.payload,
        };
      }
      case SET_NUMBER_OF_IBEACONS: {
        return {
          ...state,
          selectedNumberOfIbeacons: action.payload,
        };
      }
      default: {
        return {
          ...state,
          isFetching: false,
          error: null
        };
    }
  }
};
