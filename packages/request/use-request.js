import { makeUseAxios } from 'axios-hooks';

import { request } from './request';

const commonConfig = {
	cache          : false,
	defaultOptions : {
		ssr: false,
	},
};

const useRequest = makeUseAxios({ axios: request, ...commonConfig });

export { useRequest };
