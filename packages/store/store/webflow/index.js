/* eslint-disable default-param-last */
import { syncTypes } from './_types';

const initialState = {
	about: {},
};

export * from './actions';

const storeWebflow = (state = initialState, action) => {
	switch (action.type) {
		case syncTypes.SET_ABOUT_STATE:
			return {
				...state,
				about: {
					...state.about,
					...action.data,
				},
			};
		default:
			return state;
	}
};

export default storeWebflow;
