import { fork } from 'redux-saga/effects';

import * as user from './user.saga';

//export root saga function;
export default function* root() {
  yield fork(user.getUserVariantRequestListener);
  yield fork(user.getPricesRequestListener);
}

// import {all} from 'redux-saga/effects';
// import loginScreenSaga from 'screens/Login/saga';
// import signupScreenSaga from 'screens/Register/saga';
// function* rootSaga() {
//  yield all([loginScreenSaga(), signupScreenSaga()]);
// }
 
// export default rootSaga;