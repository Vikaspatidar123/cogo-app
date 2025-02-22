import GLOBAL_CONSTANTS from '@/ui/commons/constants/globals';

const fclFeedBackControls = [
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
				label : 'Destination detention not satisfactory',
				value : 'unsatisfactory_destination_detention',
			},
			{
				label : 'Unpreferred Shipping Line',
				value : 'unpreferred_shipping_lines',
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
		label : 'Indicative Rate',
		type  : 'number',
	},
	{
		name        : 'preferred_shipping_line_ids',
		label       : 'Preferred Shipping lines',
		type        : 'async_select',
		asyncKey    : 'shipping-lines',
		multiple    : true,
		initialCall : true,
		placeholder:
      "Enter preferred shipping line only if customer won't accept any other line",
	},
	{
		name  : 'preferred_detention_free_days',
		type  : 'number',
		label : 'Preferred Detention Days',
	},
	{
		name  : 'remarks',
		type  : 'textarea',
		label : 'Remarks',
		placeholder:
      'Please add commodity details and other specific requirements here...',
	},
];

export default fclFeedBackControls;
