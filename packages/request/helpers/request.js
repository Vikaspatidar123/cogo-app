/* eslint-disable no-undef */
import { format } from '@cogoport/utils';
import Axios from 'axios';
import qs from 'qs';

import getAuthrozationParams from './get-final-authpipe';
import getMicroServiceName from './get-microservice-name';
import { getCookie } from './getCookieFromCtx';

const PEEWEE_SERVICES = ['fcl_freight_rate', 'fcl_customs_rate', 'fcl_cfs_rate'];

const customPeeweeSerializer = (params) => {
	const dataTypes = ['Object', 'Array'].map((d) => `[object ${d}]`);

	const newParams = Object.keys(params).reduce((acc, key) => {
		acc[key] = dataTypes.includes(Object.prototype.toString.call(params[key]))
			? JSON.stringify(params[key])
			: params[key];

		return acc;
	}, {});

	const paramsStringify = qs.stringify(newParams, {
		arrayFormat   : 'repeat',
		serializeDate : (date) => formatDateToString(date),
	});

	return paramsStringify;
};

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
	const name = process.env.NEXT_PUBLIC_AUTH_TOKEN_NAME;
	const newConfig = oldConfig;
	const token = getCookie(name, oldConfig.ctx);
	const authorizationparameters = getAuthrozationParams(storeKey, newConfig.url);
	const apiPath = newConfig.url ? newConfig.url.split('/')[1] || newConfig.url.split('/')[0] : null;
	const serviceName = microServices[apiPath];
	const isDev = !process.env.NEXT_PUBLIC_APP_BASE_URL.includes('api.cogoport.com');

	const peeweeSerializerRequierd = PEEWEE_SERVICES.includes(serviceName) || (serviceName === 'location' && isDev);

	if (serviceName) {
		newConfig.url = `/${serviceName}/${apiPath}`;
	}

	if (serviceName === 'location') {
		newConfig.baseURL = 'https://api.cogoport.com';
	}
	if (apiPath === 'get_multimodal_shortest_path') {
		newConfig.baseURL = 'http://10.10.11.244:8000';
	}

	return {
		...newConfig,
		paramsSerializer : { serialize: peeweeSerializerRequierd ? customPeeweeSerializer : customSerializer },
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
