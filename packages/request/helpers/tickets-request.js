import { format } from '@cogoport/utils';
import Axios from 'axios';
import qs from 'qs';

import getAuthorizationParams from './get-final-authpipe';
import { getCookie } from './getCookieFromCtx';

const storeKey = '__COGO_APP_STORE__';

const customSerializer = (params) => {
	const paramsStringify = qs.stringify(params, {
		arrayFormat: 'brackets', serializeDate: (date) => format(date, 'isoUtcDateTime'),
	});
	return paramsStringify;
};
const ticketsRequest = Axios.create({ baseURL: process.env.NEXT_PUBLIC_TICKET_REST_BASE_API_URL });

ticketsRequest.interceptors.request.use((oldConfig) => {
	const axiosConfig = { ...oldConfig };

	const isDevMode = !process.env.NEXT_PUBLIC_APP_BASE_URL.includes('api.cogoport.com');

	const auth = process.env.NEXT_PUBLIC_AUTH_TOKEN_NAME;
	if (!isDevMode) {
		axiosConfig.baseURL = `${process.env.NEXT_PUBLIC_APP_BASE_URL}/tickets`;
	}
	const token = getCookie(auth, oldConfig.ctx);
	const authorizationparameters = getAuthorizationParams(storeKey, oldConfig.url);

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

export { ticketsRequest };
