import {takeLatest} from 'redux-saga/effects';
import {
 GET_USER_VARIANT,
 GET_PRICES
} from '../actions/action.types';
import { pricesHandler, userVaraintHandler} from './handlers/user.handlers';
import { prices } from '../reducers/user.reducer';

// Action listeners
export function* getUserVariantRequestListener(action: string = GET_USER_VARIANT){
  yield takeLatest(GET_USER_VARIANT, userVaraintHandler);
}
export function* getPricesRequestListener(){
  yield takeLatest(GET_PRICES, pricesHandler);
}