const getAlertPreferencesControls = ({ t = () => {} }) => ({
	user: {
		name        : 'user',
		type        : 'select',
		placeholder : t(
			'profile:configurations.alertPreferences.user.placeholder',
		),
	},
	select_all: {
		name    : 'select_all',
		type    : 'checkbox',
		options : [
			{
				label: t(
					'profile:configurations.alertPreferences.selectAll.options.1',
				),
				value: true,
			},
		],
		span  : 6,
		theme : 'admin',
	},
	offers_discounts: {
		name    : 'offers_discounts',
		type    : 'checkbox',
		options : [
			{
				label: t(
					'profile:configurations.alertPreferences.offerDiscounts.options.1',
				),
				value: true,
			},
		],
		span  : 6,
		theme : 'admin',
	},
	subscriber_special: {
		name    : 'subscriber_special',
		type    : 'checkbox',
		options : [
			{
				label: t(
					'profile:configurations.alertPreferences.subscriberSpecial.options.1',
				),
				value: true,
			},
		],
		span  : 6,
		theme : 'admin',
	},
	new_product_service_launches_and_updates: {
		name    : 'new_product_service_launches_and_updates',
		type    : 'checkbox',
		options : [
			{
				label: t(
					'profile:configurations.alertPreferences.newProductService.options.1',
				),
				value: true,
			},
		],
		span  : 6,
		theme : 'admin',
	},
	product_service_explainers: {
		name    : 'product_service_explainers',
		type    : 'checkbox',
		options : [
			{
				label: t(
					'profile:configurations.alertPreferences.productServiceExplainers.options.1',
				),
				value: true,
			},
		],
		span  : 6,
		theme : 'admin',
	},
	newsletter: {
		name    : 'newsletter',
		type    : 'checkbox',
		options : [
			{
				label: t(
					'profile:configurations.alertPreferences.newsletter.options.1',
				),
				value: true,
			},
		],
		span  : 2,
		theme : 'admin',
	},
	general_news: {
		name    : 'general_news',
		type    : 'checkbox',
		options : [
			{
				label: t(
					'profile:configurations.alertPreferences.generalNews.options.1',
				),
				value: true,
			},
		],
		span  : 2,
		theme : 'admin',
	},
});

export default getAlertPreferencesControls;
