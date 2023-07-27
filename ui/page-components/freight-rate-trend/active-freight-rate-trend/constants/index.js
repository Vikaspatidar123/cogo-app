export const CURRRENT_MONTH = new Date().getMonth();

export const DEFAULT_FILTERS = ({ country }) => ({

	trendDetails     : {},
	containerSize    : '20',
	containerType    : 'standard',
	shippingLine     : '',
	filteredCurrency : country?.currency_code,
	validity_end     : new Date(new Date().setMonth(CURRRENT_MONTH + 1)),
	validity_start   : new Date(new Date().setMonth(CURRRENT_MONTH - 6)),
	commodities      : 'general',

});

export const TAB_CONTROL = ({ t = () => {} }) => [
	{
		name: 'daily', title: t('frt:tab_text_1'),
	},
	{
		name: 'weekly', title: t('frt:tab_text_2'),
	},
	{
		name: 'monthly', title: t('frt:tab_text_3'),
	},
];
