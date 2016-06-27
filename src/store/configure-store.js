import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import rootReducer from '../reducers';
import createLogger from 'redux-logger';
import { RECEIVE_SEARCH_RESULT } from '../constants/actionTypes.js';

const logger = createLogger({
  predicate: (getState, action) => action.type !== RECEIVE_SEARCH_RESULT
});

const middlewares = [thunkMiddleware, logger];

if (process.env.NODE_ENV === `development`) {
  const createLogger = require(`redux-logger`);
  const logger = createLogger();
  middlewares.push(logger);
}

const createStoreWithMiddleware = applyMiddleware(...middlewares)(createStore);

export default function configureStore (initialState) {
  return createStoreWithMiddleware(rootReducer, initialState);
}
