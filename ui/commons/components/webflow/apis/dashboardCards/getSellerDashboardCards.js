const getSellerDashboardCards = async (req, res) => {
	let response = {};
	try {
		const data = await import('../../.webflow/sellerDashboardCards');
		response = res.json({
			success : true,
			data    : (data.default || []).filter((item) => item.status === true),
		});
	} catch (e) {
		response = res.json({ success: false, messages: e.message });
	}
	return response;
};

export default getSellerDashboardCards;
