import { format, getCookie } from '@cogoport/utils';
import Axios from 'axios';
import qs from 'qs';

const customSerializer = (params) => {
	const paramsStringify = qs.stringify(params, {
		arrayFormat   : 'brackets',
		serializeDate : (date) => format(date),
	});
	return paramsStringify;
};
const getOrganizationId = (storeKey, ctx) => {
	if (typeof window !== 'undefined') {
		const getStoreState = window?.[storeKey]?.getState;
		if (typeof getStoreState === 'function') {
			return getStoreState()?.general?.query?.org_id;
		}
		return null;
	}
	return ctx?.query?.org_id || null;
};
const request = Axios.create({
	baseURL: process.env.NEXT_PUBLIC_APP_BASE_URL,
});

request.interceptors.request.use((oldConfig) => {
	const storeKey = '__COGO_APP_STORE__';
	// const authorizationparameters = getAuthrozationParams(storeKey, oldConfig.url);
	const token = getCookie('token');
	// const auth_scope = getCookie('auth_scope');
	const newConfig = oldConfig;
	newConfig.paramsSerializer = customSerializer;
	newConfig.headers = {
		authorizationscope   : 'organization',
		authorizationscopeid : getOrganizationId(storeKey, oldConfig.ctx),
	};
	// if (authorizationparameters) {
	// 	newConfig.headers.authorizationparameters = authorizationparameters;
	// }
	if (token) {
		newConfig.headers.authorization = `Bearer: ${token}`;
	}

	return newConfig;
});

export { request };
