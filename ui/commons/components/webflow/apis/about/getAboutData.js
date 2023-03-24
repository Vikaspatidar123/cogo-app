import { isEmpty } from '@cogoport/utils';

const getAboutData = async (req, res) => {
	let response = {};
	try {
		const slug = (req.query || {}).slug || '';
		if (isEmpty(slug)) {
			response = res.json({
				success  : false,
				messages : 'Slug cannot be empty.',
			});
		} else {
			const data = await import(`../../.webflow/about/${slug}.js`);
			response = res.json({ success: true, data: data.default });
		}
	} catch (e) {
		response = res.json({ success: false, messages: e.message });
	}
	return response;
};

export default getAboutData;
