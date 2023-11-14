import { call, put, select, race } from 'redux-saga/effects';
import React, { Alert } from 'react-native';
import { delay } from 'redux-saga/effects';
import {
  responseUserVariantSuccessAction,
  responseUserVariantFailedAction,
} from '../../actions/user.actions';
import { userApi } from '../../../services/apis/user-api';
import { responsePricesFailedAction, responsePricesSuccessAction } from '../../actions/prices.actions';

const TIMEOUT = 30 * 1000; // 30 seconds

// Saga User Handler
export function* userVaraintHandler(action: { payload: string; }): Generator<any, any, any>{
  try {
    let { timeout, responseAction } = yield race({
      timeout: delay(TIMEOUT),
      responseAction: call(getUserVariant, action.payload),
    });
    if (!responseAction && timeout) {

      return yield put(responseUserVariantFailedAction({ error: 'Api timed out'}));
    }
    return yield put(responseAction);
  } catch (error:any) {
    throw error.response?.data || 'An error occurred';
  }
}

async function getUserVariant(params: string) {
  try {
    const responseData = await userApi.getUserVariant(params);
    return responseUserVariantSuccessAction(responseData);
  } catch (error: any) {
    return responseUserVariantFailedAction({ error: error.message });
  }
}

export function* pricesHandler(): Generator<any, any, any>{
  try {
    let { timeout, responseAction } = yield race({
      timeout: delay(TIMEOUT),
      responseAction: call(getPrices),
    });
    if (!responseAction && timeout) {

      return yield put(responsePricesFailedAction({ error: 'Api timed out'}));
    }
    return yield put(responseAction);
  } catch (error:any) {
    throw error.response?.data || 'An error occurred';
  }
}

async function getPrices() {
  try {
    const responseData = await userApi.getPrices();
    return responsePricesSuccessAction(responseData);
  } catch (error: any) {
    return responsePricesFailedAction({ error: error.message });
  }
}