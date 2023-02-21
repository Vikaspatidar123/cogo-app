export const CATEGORIES = [
	'offers_discounts',
	'subscriber_special',
	'new_product_service_launches_and_updates',
	'product_service_explainers',
	'newsletter',
	'general_news',
];

export const getReasonMapping = () => [
	{
		label : 'Your emails are too frequent',
		value : 'Your emails are not relevant to me',
	},
	{
		label : 'Your emails are not relevant to me',
		value : 'Your emails are too frequent',
	},
	{
		label : 'I don’t remember signing up for this',
		value : 'I don’t remember signing up for this',
	},
	{
		label : 'I no longer want to receive these emails',
		value : 'I no longer want to receive these emails',
	},
	{
		label : 'The emails are spam and should be reported',
		value : 'The emails are spam and should be reported',
	},
	{ label: 'Others', value: 'others' },
];
export const getMapping = () => ({
	general_news: {
		label    : 'Offers/Discounts',
		sublabel : 'Receive offers and discounts.',
	},
	new_product_service_launches_and_updates: {
		label    : 'Subscriber Special',
		sublabel : 'Receive exclusive subscriber communications.',
	},
	newsletter: {
		label    : 'New product/Service launches and updates',
		sublabel : 'Get information on latest product launches and updates.',
	},
	offers_discounts: {
		label    : 'Product/service Explainers',
		sublabel : 'Receive detailed product explanations.',
	},
	product_service_explainers: {
		label    : 'Newsletter',
		sublabel : 'Get latest newsletters and services.',
	},
	subscriber_special: {
		label    : 'General News',
		sublabel : 'Receive relevant news and information.',
	},
});

export const getMappings = () => {
	const REASON_MAPPING = getReasonMapping();
	const MAPPING = getMapping();

	return {
		REASON_MAPPING,
		MAPPING,
	};
};
