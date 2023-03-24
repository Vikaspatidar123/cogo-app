const getShipperDashboardCards = async (req, res) => {
	let response = {};
	try {
		const data = await import('../../.webflow/shipperDashboardCards');
		response = res.json({
			success : true,
			data    : (data.default || []).filter((item) => item.status === true),
		});
	} catch (e) {
		response = res.json({ success: false, messages: e.message });
	}
	return response;
};

export default getShipperDashboardCards;
