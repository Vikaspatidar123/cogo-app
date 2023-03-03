/* eslint-disable no-undef */
import getOtherApiPipe from './get-other-pipe';

const getAuthrozationParams = (storeKey, url) => {
	if (typeof window !== 'undefined') {
		const getStoreState = window?.[storeKey]?.getState;
		const profile = typeof getStoreState === 'function' ? getStoreState()?.profile : {};
		const authorizationparameters = profile?.authorizationparameters;
		const general = typeof getStoreState === 'function' ? getStoreState()?.general : {};
		const pathname = general?.pathname;
		const fallback_navigation = general?.routeConfig?.routes?.[pathname]?.navigation || '';
		if (authorizationparameters || fallback_navigation) {
			const { pipe, isMain } = getOtherApiPipe(url, authorizationparameters, getStoreState);
			if (pipe) {
				return pipe;
			}
			if (!isMain) {
				return null;
			}
			return authorizationparameters;
		}
		return null;
	}

	return '';
};
export default getAuthrozationParams;
