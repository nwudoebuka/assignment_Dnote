import rootSaga from '../sagas';
import createSagaMiddleware from 'redux-saga';
import { combineReducers } from "redux";
import {userVariant,prices} from './user.reducer';
import { createStore, applyMiddleware } from 'redux';

//const sagaMiddleware = createSagaMiddleware();
//const middlewares = [sagaMiddleware];
const rootReducer = combineReducers({
    userVariant: userVariant,
    prices: prices,
    // Add other reducers as needed
  });
// Create saga middleware
const sagaMiddleware = createSagaMiddleware();
const store = createStore(rootReducer,applyMiddleware(sagaMiddleware));
// Create Redux store with middleware
//const store = createStore(reducer, applyMiddleware(sagaMiddleware));
sagaMiddleware.run(rootSaga);

export { store };

