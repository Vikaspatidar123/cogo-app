import { syncTypes } from './_types';

export const setSearchStoreState = (data) => ({ type: syncTypes.SET_STORE_STATE, data });

export const setPastSearchesState = (past_searches) => ({
	type: syncTypes.SET_PAST_SEARCHES_STATE,
	past_searches,
});

export const setSideModalState = (state) => ({
	type: syncTypes.SET_SIDE_MODAL_STATE,
	state,
});
