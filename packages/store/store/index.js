/* eslint-disable import/no-unresolved */
/* eslint-disable no-undef */
// import general from './general';
// import profile from './profile';
// import user from './user';

// export default { general, profile, user };

import {
	combineReducers, createStore, applyMiddleware, compose,
} from 'redux';
import thunk from 'redux-thunk';

import withRedux from '../components/withRedux';

import general from './general';

const enhancers = [];
const middleware = [thunk];

const composeWithDevTools = typeof window === 'object'
	&& window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
	&& (process.env.NODE_ENV === 'development' || localStorage.getItem('jdgfajf7231648'))
	? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
	: compose;

const composedEnhancers = composeWithDevTools(applyMiddleware(...middleware), ...enhancers);

const createWithStore = (reducers, config) => withRedux((initialState = {}) => {
	const rootReducer = combineReducers({ general, ...reducers });
	return createStore(rootReducer, initialState, composedEnhancers);
}, config);

export default createWithStore;
