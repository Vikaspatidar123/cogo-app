const getAlertPreferencesControls = ({ t }) => ({
	user: {
		name        : 'user',
		type        : 'select',
		placeholder : 'alertPreferences.user.pl',
	},
	select_all: {
		name    : 'select_all',
		type    : 'checkbox',
		label   : t('settings:alert_preferences_control_label_1'),
		options : [
			{
				label : t('settings:alert_preferences_control_label_1'),
				value : true,
			},
		],
		span  : 6,
		theme : 'admin',
	},
	offers_discounts: {
		name    : 'offers_discounts',
		type    : 'checkbox',
		label   : t('settings:alert_preferences_control_label_2'),
		options : [
			{
				label : t('settings:alert_preferences_control_label_2'),
				value : true,
			},
		],
		span  : 6,
		theme : 'admin',
	},
	subscriber_special: {
		name    : 'subscriber_special',
		type    : 'checkbox',
		label   : t('settings:alert_preferences_control_label_3'),
		options : [
			{
				label : t('settings:alert_preferences_control_label_3'),
				value : true,
			},
		],
		span  : 6,
		theme : 'admin',
	},
	new_product_service_launches_and_updates: {
		name    : 'new_product_service_launches_and_updates',
		type    : 'checkbox',
		label   : t('settings:alert_preferences_control_label_4'),
		options : [
			{
				label : t('settings:alert_preferences_control_label_4'),
				value : true,
			},
		],
		span  : 6,
		theme : 'admin',
	},
	product_service_explainers: {
		name    : 'product_service_explainers',
		type    : 'checkbox',
		label   : t('settings:alert_preferences_control_label_5'),
		options : [
			{
				label : t('settings:alert_preferences_control_label_5'),
				value : true,
			},
		],
		span  : 6,
		theme : 'admin',
	},
	newsletter: {
		name    : 'newsletter',
		type    : 'checkbox',
		label   : t('settings:alert_preferences_control_label_6'),
		options : [
			{
				label : t('settings:alert_preferences_control_label_6'),
				value : true,
			},
		],
		span  : 2,
		theme : 'admin',
	},
	general_news: {
		name    : 'general_news',
		type    : 'checkbox',
		label   : t('settings:alert_preferences_control_label_7'),
		options : [
			{
				label : t('settings:alert_preferences_control_label_7'),
				value : true,
			},
		],
		span  : 2,
		theme : 'admin',
	},
});

export default getAlertPreferencesControls;
