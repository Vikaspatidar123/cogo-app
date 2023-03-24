const getNothing = async (req, res) => {
	let response = {};
	try {
		response = res.json({ success: true, data: {} });
	} catch (e) {
		response = res.json({ success: false, messages: e.message });
	}
	return response;
};

export default getNothing;
