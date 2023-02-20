import { useTranslation } from 'next-i18next';

export const CATEGORIES = [
	'offers_discounts',
	'subscriber_special',
	'new_product_service_launches_and_updates',
	'product_service_explainers',
	'newsletter',
	'general_news',
];

export const getReasonMapping = ({ t = () => {} }) => [
	{
		label : t('profile:constants.reasonMapping.1'),
		value : 'Your emails are not relevant to me',
	},
	{
		label : t('profile:constants.reasonMapping.2'),
		value : 'Your emails are too frequent',
	},
	{
		label : t('profile:constants.reasonMapping.3'),
		value : 'I don’t remember signing up for this',
	},
	{
		label : t('profile:constants.reasonMapping.4'),
		value : 'I no longer want to receive these emails',
	},
	{
		label : t('profile:constants.reasonMapping.5'),
		value : 'The emails are spam and should be reported',
	},
	{ label: t('profile:constants.reasonMapping.6'), value: 'others' },
];
export const getMapping = ({ t = () => {} }) => ({
	general_news: {
		label    : t('profile:constants.mapping.general_news.label'),
		sublabel : t('profile:constants.mapping.general_news.sublabel'),
	},
	new_product_service_launches_and_updates: {
		label: t(
			'profile:constants.mapping.new_product_service_launches_and_updates.label',
		),
		sublabel: t(
			'profile:constants.mapping.new_product_service_launches_and_updates.sublabel',
		),
	},
	newsletter: {
		label    : t('profile:constants.mapping.newsletter.label'),
		sublabel : t('profile:constants.mapping.newsletter.sublabel'),
	},
	offers_discounts: {
		label    : t('profile:constants.mapping.offers_discounts.label'),
		sublabel : t('profile:constants.mapping.offers_discounts.sublabel'),
	},
	product_service_explainers: {
		label    : t('profile:constants.mapping.product_service_explainers.label'),
		sublabel : t(
			'profile:constants.mapping.product_service_explainers.sublabel',
		),
	},
	subscriber_special: {
		label    : t('profile:constants.mapping.subscriber_special.label'),
		sublabel : t('profile:constants.mapping.subscriber_special.sublabel'),
	},
});

export const getMappings = () => {
	const { t } = useTranslation(['profile']);
	const REASON_MAPPING = getReasonMapping({ t });
	const MAPPING = getMapping({ t });

	return {
		REASON_MAPPING,
		MAPPING,
	};
};
