import { toDate } from '@cogoport/utils';

import currencies from '@/packages/forms/constants/currencies';

const filterControls = [
	{
		name        : 'container-size',
		type        : 'select',
		placeholder : 'container-size',
		multiple    : false,
		options     : [
			{
				label : '20ft',
				value : '20',
			},
			{
				label : '40ft',
				value : '40',
			},
			{
				label : '40ft HC',
				value : '40HC',
			},
			{
				label : '45ft HC',
				value : '45HC',
			},
		],
	},
	{
		name        : 'container_type',
		type        : 'select',
		placeholder : 'Type',
		multiple    : false,
		options     : [
			{
				label : 'Standard (Dry)',
				value : 'standard',
			},
			{
				label : 'Refrigerated (Reefer)',
				value : 'refer',
			},
			{
				label : 'Open Top',
				value : 'open_top',
			},
			{
				label : 'Flat Rack',
				value : 'flat_rack',
			},
			{
				label : 'ISO Tank',
				value : 'iso_tank',
			},
			{
				label : 'Open Side (One Door Open)',
				value : 'open_side',
			},
		],
	},
	{
		name        : 'commodity',
		type        : 'select',
		caret       : true,
		placeholder : 'Commodity',
		multiple    : false,
	},
	{
		name                  : 'date_range',
		type                  : 'datepicker',
		pickerType            : 'range',
		placeholder           : 'Date Range',
		minDate               : toDate(),
		maxDate               : toDate(),
		isPreviousDaysAllowed : true,
	},
	{
		name        : 'currency',
		type        : 'select',
		placeholder : 'Currency',
		multiple    : false,
		options     : currencies,
	},
];

export default filterControls;
