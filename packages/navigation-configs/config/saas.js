const saas = {
	'/saas/product-inventory': {
		navigation: 'saas_planning-product_inventory',
	},
	'/saas/freight-rate-trend': {
		navigation : 'saas_tools-freight_rate_trend',
		isMainNav  : true,
	},
	'/saas/freight-rate-trend/[trend_id]': {
		navigation : 'saas_tools-freight_rate_trend',
		isMainNav  : true,
	},
};

module.exports = saas;
