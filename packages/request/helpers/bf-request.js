/* eslint-disable no-undef */
import { format } from '@cogoport/utils';
import Axios from 'axios';
import qs from 'qs';

import getAuthrozationParams from './get-final-authpipe';
import { getCookie } from './getCookieFromCtx';

const customSerializer = (params) => {
	const paramsStringify = qs.stringify(params, {
		encode        : false,
		arrayFormat   : 'repeat',
		serializeDate : (date) => format(date),
	});
	return paramsStringify;
};

const bfRequest = Axios.create({ baseURL: process.env.NEXT_PUBLIC_BUSINESS_FINANCE_BASE_URL });

bfRequest.interceptors.request.use((oldConfig) => {
	const { authKey = '', scope = '', ...axiosConfig } = oldConfig;
	const storeKey = '__COGO_APP_STORE__';
	const name = process.env.NEXT_PUBLIC_AUTH_TOKEN_NAME;
	const token = getCookie(name, oldConfig.ctx);
	const authorizationparameters = getAuthrozationParams(storeKey, authKey);

	if (scope === 'cogocare') {
		axiosConfig.baseURL = process.env.NEXT_PUBLIC_TICKET_REST_BASE_API_URL;

		if (!isDevMode) {
			axiosConfig.baseURL = `${baseURL}/tickets`;
		}
	}

	return {
		...axiosConfig,
		paramsSerializer : { serialize: customSerializer },
		headers          : {
			authorizationscope : 'organization',
			authorization      : `Bearer: ${token}`,
			authorizationparameters,
		},

	};
});

export { bfRequest };
