import { applyMiddleware, compose, legacy_createStore as createStore } from 'redux';
import thunk from 'redux-thunk';
import reducers from '../reducers';

const logger = (store) => (next) => (action) => { next(action) };

const composeAlt = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const composedEnhancers = composeAlt(applyMiddleware(thunk, logger))
const store = createStore( reducers ,composedEnhancers);

export default store;