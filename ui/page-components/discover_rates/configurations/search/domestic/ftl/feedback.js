import GLOBAL_CONSTANTS from '@/ui/commons/constants/globals';

const ftlFeedBackControls = [
	{
		name     : 'feedbacks',
		type     : 'checkbox',
		label    : '',
		multiple : true,
		options  : [
			{
				label : 'Rate not satisfactory',
				value : 'unsatisfactory_rate',
			},
		],
		rules: { required: 'Required' },
	},
	{
		name    : 'preferred_freight_rate_currency',
		label   : 'Currency',
		type    : 'select',
		caret   : true,
		options : [
			GLOBAL_CONSTANTS.currency_code.USD,
			GLOBAL_CONSTANTS.currency_code.INR,
			GLOBAL_CONSTANTS.currency_code.EUR,
			GLOBAL_CONSTANTS.currency_code.GBP,
			GLOBAL_CONSTANTS.currency_code.VND,
			GLOBAL_CONSTANTS.currency_code.SGD,
			GLOBAL_CONSTANTS.currency_code.THB,
			GLOBAL_CONSTANTS.currency_code.IDR,
			GLOBAL_CONSTANTS.currency_code.CNY,
		].map((currencyCode) => ({
			label : currencyCode,
			value : currencyCode,
		})),
	},
	{
		name  : 'preferred_freight_rate',
		label : 'Indicative Sell Rate',
		type  : 'number',
	},
	{
		name  : 'remarks',
		type  : 'text',
		label : 'Remarks',
		placeholder:
			'Please add commodity details and other specific requirements here...',
	},
];

export default ftlFeedBackControls;
