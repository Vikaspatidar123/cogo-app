const getAlertPreferencesControls = () => ({
	user: {
		name        : 'user',
		type        : 'select',
		placeholder : 'alertPreferences.user.pl',
	},
	select_all: {
		name    : 'select_all',
		type    : 'checkbox',
		label   : 'Select All',
		options : [
			{
				label : 'Select All				',
				value : true,
			},
		],
		span  : 6,
		theme : 'admin',
	},
	offers_discounts: {
		name    : 'offers_discounts',
		type    : 'checkbox',
		label   : 'Offers/Discounts',
		options : [
			{
				label : 'Offers/Discounts',
				value : true,
			},
		],
		span  : 6,
		theme : 'admin',
	},
	subscriber_special: {
		name    : 'subscriber_special',
		type    : 'checkbox',
		label   : 'Subscriber Special',
		options : [
			{
				label : 'Subscriber Special',
				value : true,
			},
		],
		span  : 6,
		theme : 'admin',
	},
	new_product_service_launches_and_updates: {
		name    : 'new_product_service_launches_and_updates',
		type    : 'checkbox',
		label   : 'New product/Service launches and updates',
		options : [
			{
				label : 'New product/Service launches and updates',
				value : true,
			},
		],
		span  : 6,
		theme : 'admin',
	},
	product_service_explainers: {
		name    : 'product_service_explainers',
		type    : 'checkbox',
		label   : 'Product/service Explainers',
		options : [
			{
				label : 'Product/service Explainers',
				value : true,
			},
		],
		span  : 6,
		theme : 'admin',
	},
	newsletter: {
		name    : 'newsletter',
		type    : 'checkbox',
		label   : 'Newsletter',
		options : [
			{
				label : 'Newsletter',
				value : true,
			},
		],
		span  : 2,
		theme : 'admin',
	},
	general_news: {
		name    : 'general_news',
		type    : 'checkbox',
		label   : 'General News',
		options : [
			{
				label : 'General News',
				value : true,
			},
		],
		span  : 2,
		theme : 'admin',
	},
});

export default getAlertPreferencesControls;
