import { request } from '@/packages/request';

export const postData = (endPoint, params) => request().post(endPoint, params);

export const getListData =	(endpoint) => (params = {}) => request().get(endpoint, { params });

export const getData = async (endPoint, params) => {
	const res = await request().get(endPoint, { params });
	if (!res.hasError) {
		return { response: res.data, messages: null };
	}
	return { messages: res.messages, response: {} };
};
