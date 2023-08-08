export const CATEGORIES = [
	'offers_discounts',
	'subscriber_special',
	'new_product_service_launches_and_updates',
	'product_service_explainers',
	'newsletter',
	'general_news',
];

export const getReasonMapping = ({ t }) => [
	{
		label : t('settings:unsubscribe_reason_1'),
		value : 'Your emails are too frequent',
	},
	{
		label : t('settings:unsubscribe_reason_2'),
		value : 'Your emails are not relevant to me',
	},
	{
		label : t('settings:unsubscribe_reason_3'),
		value : 'I don’t remember signing up for this',
	},
	{
		label : t('settings:unsubscribe_reason_4'),
		value : 'I no longer want to receive these emails',
	},
	{
		label : t('settings:unsubscribe_reason_5'),
		value : 'The emails are spam and should be reported',
	},
	{ label: t('settings:unsubscribe_reason_6'), value: 'others' },
];

export const getMapping = ({ t }) => ({
	general_news: {
		label    : t('settings:alerts_text_1'),
		sublabel : t('settings:alerts_text_2'),
	},
	new_product_service_launches_and_updates: {
		label    : t('settings:alerts_text_3'),
		sublabel : t('settings:alerts_text_4'),
	},
	newsletter: {
		label    : t('settings:alerts_text_5'),
		sublabel : t('settings:alerts_text_6'),
	},
	offers_discounts: {
		label    : t('settings:alerts_text_7'),
		sublabel : t('settings:alerts_text_8'),
	},
	product_service_explainers: {
		label    : t('settings:alerts_text_9'),
		sublabel : t('settings:alerts_text_10'),
	},
	subscriber_special: {
		label    : t('settings:alerts_text_11'),
		sublabel : t('settings:alerts_text_12'),
	},
});

export const getMappings = ({ t }) => {
	const REASON_MAPPING = getReasonMapping({ t });
	const MAPPING = getMapping({ t });

	return {
		REASON_MAPPING,
		MAPPING,
	};
};
