import { syncTypes } from './_types';

const initialState = {};

// eslint-disable-next-line default-param-last
const storeEnquiry = (state = initialState, action) => {
	switch (action.type) {
		case syncTypes.SET_STORE_STATE:
			return { ...state, ...action.data };
		case syncTypes.SET_PAST_SEARCHES_STATE:
			return { ...state, ...action.past_searches };
		default:
			return state;
	}
};

export * from './actions';

export default storeEnquiry;
