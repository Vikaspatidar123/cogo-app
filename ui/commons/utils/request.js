import { qs } from '@cogoport/front/request';
import { getCookie, startCase } from '@cogoport/utils';

import getAuthrozationParams from '@/packages/request/helpers/get-final-authpipe';

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

const showError = async () => {
	// TODO: Add toast
};

const config = {
	partner: {
		tokenKey : 'cogo-admin-token',
		storeKey : '__COGO_PARTNER_STORE__',
	},
	app: {
		tokenKey : 'cogo-auth-token',
		storeKey : '__COGO_APP_STORE__',
	},
	public: { options: {} },
};

const request = rawRequest.create();

request.interceptors.request.use((oldAxiosConfig) => {
	const { scope = 'public', ...axiosConfig } = oldAxiosConfig;
	const { tokenKey, storeKey } = config[scope];
	const token = getCookie(tokenKey, oldAxiosConfig.ctx);
	axiosConfig.timeout = 300000;
	axiosConfig.paramsSerializer = (params) => {
		const paramsStringify = qs.stringify(params, { arrayFormat: 'brackets' });
		return paramsStringify;
	};
	const authorizationparameters = getAuthrozationParams(storeKey, axiosConfig.url);
	switch (scope) {
		case 'partner':
			axiosConfig.baseURL = process.env.PARTNER_REST_BASE_API_URL;
			axiosConfig.headers = { authorizationscope: 'partner' };
			if (authorizationparameters) {
				axiosConfig.headers.authorizationparameters = authorizationparameters;
			}
			if (token) {
				axiosConfig.headers.authorization = `Bearer: ${token}`;
			}
			break;
		case 'app':
			axiosConfig.baseURL = process.env.REST_BASE_API_URL;
			axiosConfig.headers = {
				authorizationscope   : 'organization',
				authorizationscopeid : getOrganizationId(storeKey, oldAxiosConfig.ctx),
			};
			if (authorizationparameters) {
				axiosConfig.headers.authorizationparameters = authorizationparameters;
			}
			if (token) {
				axiosConfig.headers.authorization = `Bearer: ${token}`;
			}
			break;
		case 'public':
		default:
			break;
	}

	return axiosConfig;
});

request.interceptors.response.use(
	(response) => ({ hasError: false, data: response?.data, status: response?.status }),
	(error) => {
		if (error.response) {
			const { status } = error?.response || {};
			if (status === 400 || status === 500) {
				const res = error?.response?.data;
				const keys = Object.keys(res);
				const errorObj = {};
				keys.forEach((key) => {
					errorObj[key] = `${startCase(key)} ${
						Array.isArray(res[key]) ? (res[key] || []).join(', ') : res[key]
					}`;
				});
				// eslint-disable-next-line prefer-promise-reject-errors
				return Promise.reject({ status, data: errorObj });
			}
			if (error?.response?.status === 401) {
				showError('Authentication failed!');
			} else {
				showError(
					`The application has encountered an unknown error.
						Our team is looking into this with the utmost urgency. 
						Please try again after some time. If the issue persists, please contact us via chat.`,
				);
			}
			return Promise.reject(error);
			// return Promise.reject({ hasError: true, messages: [error.toString()] });
		}
		return Promise.reject(error);
		// return Promise.reject({ hasError: true, messages: [error.toString()] });
	},
);

export default request;
