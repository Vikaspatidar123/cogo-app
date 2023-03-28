import GLOBAL_CONSTANTS from '@cogo/globalization/constants/globals.json';

const airFeedBackControls = [
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
			{
				label : 'Unpreferred Air Line',
				value : 'unpreferred_airlines',
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
		].map((currencyCode) => ({
			label : currencyCode,
			value : currencyCode,
		})),
	},
	{
		name  : 'preferred_freight_rate',
		label : 'Indicative Rate',
		type  : 'number',
	},
	{
		name           : 'preferred_airline_ids',
		type           : 'select',
		optionsListKey : 'air-lines',
		defaultOptions : true,
		caret          : true,
		label          : 'Preferred Air lines',
		multiple       : true,
		autoCloseMenu  : false,
		placeholder:
			"Enter preferred airline line only if customer won't accept any other line",
	},
	{
		name  : 'remarks',
		type  : 'text',
		label : 'Remarks',
		placeholder:
			'Please add commodity details and other specific requirements here...',
	},
];

export default airFeedBackControls;
