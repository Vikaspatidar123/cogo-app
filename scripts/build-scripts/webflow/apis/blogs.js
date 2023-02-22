require('dotenv').config();
const axios = require('axios');

const about = async () => {
	let response = {};

	try {
		response = await axios.get(
			`https://api.webflow.com/collections/${process.env.WEBFLOW_BLOG_COLLECTION_ID}/items`,
			{
				headers: {
					'accept-version' : '1.0.0',
					authorization    : `Bearer ${process.env.WEBFLOW_TOKEN}`,
				},
			},
		);
	} catch (e) {
		console.log(e);
		response = {};
	}

	const blogs = response.data.items
		.sort((a, b) => (a['published-on'] > b['published-on'] ? -1 : 1))
		.slice(0, 20)
		.map((blog) => ({
			slug  : blog.slug,
			name  : blog.name,
			image : {
				url: blog.image?.url,
			},
			'short-overview': blog['short-overview'],
		}));

	const processed_response = {
		...response,
		data: {
			items: blogs,
		},
	};

	return processed_response;
};

module.exports = about;
