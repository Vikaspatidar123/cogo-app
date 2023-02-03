import { request } from '@/packages/request';

const getOrganisation = async (ctx) => {
	const res = await request.get('/get_organization', { ctx });
	if (!res.hasError) {
		return { response: res.data, messages: null };
	}
	return { messages: res.messages, response: {} };
};

export default getOrganisation;
