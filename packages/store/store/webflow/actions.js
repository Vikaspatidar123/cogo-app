import { syncTypes } from './_types';

export const setAboutState = (data) => ({
	type: syncTypes.SET_ABOUT_STATE,
	data,
});
