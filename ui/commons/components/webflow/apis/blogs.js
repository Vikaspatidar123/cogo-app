const getBlogs = async (req, res) => {
	let response = {};
	try {
		const data = await import('../.webflow/blogs');
		response = res.json({
			success: true,
			data,
		});
	} catch (e) {
		response = res.json({ success: false, messages: e.message });
	}
	return response;
};

export default getBlogs;
