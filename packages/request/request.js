/* eslint-disable no-undef */
import { format } from '@cogoport/utils';
import Axios from 'axios';
import qs from 'qs';

import getAuthrozationParams from './get-final-authpipe';
import getMicroServiceName from './get-microservice-name';
import { getCookie } from './getCookieFromCtx';

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

const microServices = getMicroServiceName();

const request = Axios.create({
	baseURL: process.env.NEXT_PUBLIC_APP_BASE_URL,
});
request.interceptors.request.use((oldConfig) => {
	const storeKey = '__COGO_APP_STORE__';
	const name = 'cogo-auth-token';
	const newConfig = oldConfig;
	const token = getCookie(name, oldConfig.ctx);
	const authorizationparameters = getAuthrozationParams(storeKey, newConfig.url);
	const apiPath = newConfig.url ? newConfig.url.split('/')[1] || newConfig.url.split('/')[0] : null;
	const serviceName = microServices[apiPath];
	if (serviceName) {
		newConfig.url = `/${serviceName}/${apiPath}`;
	}
	// newConfig.headers = {
	// 	authorizationscope   : 'organization',
	// 	authorizationscopeid : getOrganizationId(storeKey, oldConfig.ctx),
	// };
	return {
		...newConfig,
		paramsSerializer : { serialize: customSerializer },
		headers          : {
			authorizationscope   : 'organization',
			authorization        : `Bearer: ${token}`,
			authorizationparameters,
			'Content-Type'       : 'application/json',
			authorizationscopeid : getOrganizationId(storeKey, oldConfig.ctx),
		},

	};
});

export { request };
