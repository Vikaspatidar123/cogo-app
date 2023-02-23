import { toDate } from '@cogoport/utils';

const getRateControls = (currency, origin_port, destination_port) => [
	{
		name           : 'origin_port_id',
		label          : 'Origin Port',
		type           : 'select',
		optionsListKey : 'locations',
		params         : { filters: { type: ['seaport'] } },
		caret          : true,
		placeholder    : 'Select Origin',
		disabled       : true,
		value          : origin_port.id || null,
	},
	{
		name           : 'destination_port_id',
		label          : 'Destination Port',
		type           : 'select',
		optionsListKey : 'locations',
		params         : { filters: { type: ['seaport'] } },
		caret          : true,
		disabled       : true,
		value          : destination_port.id || null,
		placeholder    : 'Select Destination',
	},
	{
		name                  : 'date_range',
		type                  : 'datepicker',
		pickerType            : 'range',
		size                  : 'lg',
		placeholder           : 'Date Range',
		label                 : 'Select Validity',
		minDate               : toDate('2017-04-01T00:00:00'),
		maxDate               : toDate(),
		isPreviousDaysAllowed : true,
		rules                 : { required: 'Select Start date and End date', inputType: 'group' },
	},
	{
		name    : 'commodity',
		label   : 'Commodity',
		type    : 'select',
		size    : 'lg',
		caret   : true,
		options : [
			{
				label : '20 Standard',
				value : '20_standard',
			},
			{
				label : '40 Standard',
				value : '40_standard',
			},
			{
				label : '40HC Standard',
				value : '40HC_standard',
			},
			{
				label : '45HC Standard',
				value : '45HC_standard',
			},
			{
				label : '20 Refer',
				value : '20_refer',
			},
			{
				label : '40 Refer',
				value : '40_refer',
			},
			{
				label : '40HC Refer',
				value : '40HC_refer',
			},
			{
				label : '45HC Refer',
				value : '45HC_refer',
			},
		],
		rules: { required: 'Commodity is required' },
	},
	{
		name        : 'price_select',
		value       : currency,
		label       : 'Country Currency',
		type        : 'currency-select',
		size        : 'lg',
		placeholder : 'Select',
		rules       : { required: 'Currency is required' },
	},
	{
		name        : 'price_number',
		value       : '',
		label       : 'Amount (per container)',
		type        : 'number',
		placeholder : 'Enter Amount',
		style       : { height: '38px' },
		rules       : { required: 'Amount (per container) is required' },
	},
	{
		name        : 'volume',
		label       : 'Volume (Number of Containers)',
		type        : 'text',
		placeholder : 'Enter',
		value       : '1',
		style       : { height: '38px' },
		rules       : { required: 'Volume (Number of Containers) is required' },
	},
];

export default getRateControls;
