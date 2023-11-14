import * as types from './action.types';
// User variant actions
export const getUserVariant = (payload: string) => {
  return {
    type: types.GET_USER_VARIANT,
    payload: payload,
  };
};

export const responseUserVariantSuccessAction = (responseData: any) => {
  return {
    type: types.USER_VARIANT_SUCCEEDED,
    payload: responseData,
  };
};

export const responseUserVariantFailedAction = (message: { error: any; }) => {
  return {
    type: types.USER_VARIANT_FAILED,
    payload: message,
  };
};