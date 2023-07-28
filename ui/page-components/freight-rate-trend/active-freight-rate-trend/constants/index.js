export const CURRRENT_MONTH = new Date().getMonth();
export const PLUS_ONE_MONTH = 1;
export const PLUS_SIX_MONTH = 6;

export const DEFAULT_FILTERS = ({ country }) => ({

	trendDetails     : {},
	containerSize    : '20',
	containerType    : 'standard',
	shippingLine     : '',
	filteredCurrency : country?.currency_code,
	validity_end     : new Date(new Date().setMonth(CURRRENT_MONTH + PLUS_ONE_MONTH)),
	validity_start   : new Date(new Date().setMonth(CURRRENT_MONTH - PLUS_SIX_MONTH)),
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
