import { toDate } from '@cogoport/utils';

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
		options     : [
			{
				label : 'USD',
				value : 'USD',
			},
			{
				label : 'INR',
				value : 'INR',
			},
			{
				label : 'EUR',
				value : 'EUR',
			},
			{
				label : 'GBP',
				value : 'GBP',
			},
			{
				label : 'AAD',
				value : 'AAD',
			},
			{
				label : 'AED',
				value : 'AED',
			},
			{
				label : 'AFN',
				value : 'AFN',
			},
			{
				label : 'ALL',
				value : 'ALL',
			},
			{
				label : 'AMD',
				value : 'AMD',
			},
			{
				label : 'ANG',
				value : 'ANG',
			},
			{
				label : 'AOA',
				value : 'AOA',
			},
			{
				label : 'ARS',
				value : 'ARS',
			},
			{
				label : 'AUD',
				value : 'AUD',
			},
			{
				label : 'AWG',
				value : 'AWG',
			},
			{
				label : 'AZN',
				value : 'AZN',
			},
			{
				label : 'BAM',
				value : 'BAM',
			},
			{
				label : 'BBD',
				value : 'BBD',
			},
			{
				label : 'BDT',
				value : 'BDT',
			},
			{
				label : 'BGN',
				value : 'BGN',
			},
			{
				label : 'BHD',
				value : 'BHD',
			},
			{
				label : 'BIF',
				value : 'BIF',
			},
			{
				label : 'BMD',
				value : 'BMD',
			},
			{
				label : 'BND',
				value : 'BND',
			},
			{
				label : 'BOB',
				value : 'BOB',
			},
			{
				label : 'BRL',
				value : 'BRL',
			},
			{
				label : 'BSD',
				value : 'BSD',
			},
			{
				label : 'BTN',
				value : 'BTN',
			},
			{
				label : 'BWP',
				value : 'BWP',
			},
			{
				label : 'BYN',
				value : 'BYN',
			},
			{
				label : 'BZD',
				value : 'BZD',
			},
			{
				label : 'CAD',
				value : 'CAD',
			},
			{
				label : 'CDF',
				value : 'CDF',
			},
			{
				label : 'CFP',
				value : 'CFP',
			},
			{
				label : 'CHF',
				value : 'CHF',
			},
			{
				label : 'CLP',
				value : 'CLP',
			},
			{
				label : 'CNY',
				value : 'CNY',
			},
			{
				label : 'COP',
				value : 'COP',
			},
			{
				label : 'CRC',
				value : 'CRC',
			},
			{
				label : 'CUP',
				value : 'CUP',
			},
			{
				label : 'CVE',
				value : 'CVE',
			},
			{
				label : 'CZK',
				value : 'CZK',
			},
			{
				label : 'DJF',
				value : 'DJF',
			},
			{
				label : 'DKK',
				value : 'DKK',
			},
			{
				label : 'DOP',
				value : 'DOP',
			},
			{
				label : 'DZD',
				value : 'DZD',
			},
			{
				label : 'EGP',
				value : 'EGP',
			},
			{
				label : 'ERN',
				value : 'ERN',
			},
			{
				label : 'ETB',
				value : 'ETB',
			},
			{
				label : 'EUR',
				value : 'EUR',
			},
			{
				label : 'FJD',
				value : 'FJD',
			},
			{
				label : 'FKP',
				value : 'FKP',
			},
			{
				label : 'GBP',
				value : 'GBP',
			},
			{
				label : 'GEL',
				value : 'GEL',
			},
			{
				label : 'GHS',
				value : 'GHS',
			},
			{
				label : 'GIP',
				value : 'GIP',
			},
			{
				label : 'GMD',
				value : 'GMD',
			},
			{
				label : 'GNF',
				value : 'GNF',
			},
			{
				label : 'GTQ',
				value : 'GTQ',
			},
			{
				label : 'GYD',
				value : 'GYD',
			},
			{
				label : 'HKD',
				value : 'HKD',
			},
			{
				label : 'HNL',
				value : 'HNL',
			},
			{
				label : 'HRK',
				value : 'HRK',
			},
			{
				label : 'HTG',
				value : 'HTG',
			},
			{
				label : 'HUF',
				value : 'HUF',
			},
			{
				label : 'IDR',
				value : 'IDR',
			},
			{
				label : 'INR',
				value : 'INR',
			},
			{
				label : 'ILS',
				value : 'ILS',
			},
			{
				label : 'IMP',
				value : 'IMP',
			},
			{
				label : 'IQD',
				value : 'IQD',
			},
			{
				label : 'IRR',
				value : 'IRR',
			},
			{
				label : 'ISK',
				value : 'ISK',
			},
			{
				label : 'IMD',
				value : 'IMD',
			},
			{
				label : 'JMD',
				value : 'JMD',
			},
			{
				label : 'JOD',
				value : 'JOD',
			},
			{
				label : 'JPY',
				value : 'JPY',
			},
			{
				label : 'KES',
				value : 'KES',
			},
			{
				label : 'KGS',
				value : 'KGS',
			},
			{
				label : 'KHR',
				value : 'KHR',
			},
			{
				label : 'KMF',
				value : 'KMF',
			},
			{
				label : 'KPW',
				value : 'KPW',
			},
			{
				label : 'KWD',
				value : 'KWD',
			},
			{
				label : 'KRW',
				value : 'KRW',
			},
			{
				label : 'KYD',
				value : 'KYD',
			},
			{
				label : 'KZT',
				value : 'KZT',
			},
			{
				label : 'LAK',
				value : 'LAK',
			},
			{
				label : 'LBP',
				value : 'LBP',
			},
			{
				label : 'LKR',
				value : 'LKR',
			},
			{
				label : 'LRD',
				value : 'LRD',
			},
			{
				label : 'LSL',
				value : 'LSL',
			},
			{
				label : 'LYD',
				value : 'LYD',
			},
			{
				label : 'MAD',
				value : 'MAD',
			},
			{
				label : 'MDL',
				value : 'MDL',
			},
			{
				label : 'MGA',
				value : 'MGA',
			},
			{
				label : 'MKD',
				value : 'MKD',
			},
			{
				label : 'MMK',
				value : 'MMK',
			},
			{
				label : 'MNT',
				value : 'MNT',
			},
			{
				label : 'MRO',
				value : 'MRO',
			},
			{
				label : 'MUR',
				value : 'MUR',
			},
			{
				label : 'MVR',
				value : 'MVR',
			},
			{
				label : 'MWK',
				value : 'MWK',
			},
			{
				label : 'MXN',
				value : 'MXN',
			},
			{
				label : 'MYR',
				value : 'MYR',
			},
			{
				label : 'MZN',
				value : 'MZN',
			},
			{
				label : 'NAD',
				value : 'NAD',
			},
			{
				label : 'NGN',
				value : 'NGN',
			},
			{
				label : 'NIO',
				value : 'NIO',
			},
			{
				label : 'NOK',
				value : 'NOK',
			},
			{
				label : 'NPR',
				value : 'NPR',
			},
			{
				label : 'NZD',
				value : 'NZD',
			},
			{
				label : 'OMR',
				value : 'OMR',
			},
			{
				label : 'PEN',
				value : 'PEN',
			},
			{
				label : 'PGK',
				value : 'PGK',
			},
			{
				label : 'PHP',
				value : 'PHP',
			},
			{
				label : 'PKR',
				value : 'PKR',
			},
			{
				label : 'PLN',
				value : 'PLN',
			},
			{
				label : 'PYG',
				value : 'PYG',
			},
			{
				label : 'QAR',
				value : 'QAR',
			},
			{
				label : 'RON',
				value : 'RON',
			},
			{
				label : 'RSD',
				value : 'RSD',
			},
			{
				label : 'RUB',
				value : 'RUB',
			},
			{
				label : 'RWF',
				value : 'RWF',
			},
			{
				label : 'SAR',
				value : 'SAR',
			},
			{
				label : 'SBD',
				value : 'SBD',
			},
			{
				label : 'SCR',
				value : 'SCR',
			},
			{
				label : 'SDG',
				value : 'SDG',
			},
			{
				label : 'SEK',
				value : 'SEK',
			},
			{
				label : 'SGD',
				value : 'SGD',
			},
			{
				label : 'SHP',
				value : 'SHP',
			},
			{
				label : 'SLL',
				value : 'SLL',
			},
			{
				label : 'SOS',
				value : 'SOS',
			},
			{
				label : 'SRD',
				value : 'SRD',
			},
			{
				label : 'SSP',
				value : 'SSP',
			},
			{
				label : 'STD',
				value : 'STD',
			},
			{
				label : 'SYP',
				value : 'SYP',
			},
			{
				label : 'SZL',
				value : 'SZL',
			},
			{
				label : 'THB',
				value : 'THB',
			},
			{
				label : 'TJS',
				value : 'TJS',
			},
			{
				label : 'TMT',
				value : 'TMT',
			},
			{
				label : 'TND',
				value : 'TND',
			},
			{
				label : 'TOP',
				value : 'TOP',
			},
			{
				label : 'TRY',
				value : 'TRY',
			},
			{
				label : 'TTD',
				value : 'TTD',
			},
			{
				label : 'TWD',
				value : 'TWD',
			},
			{
				label : 'TZS',
				value : 'TZS',
			},
			{
				label : 'UAH',
				value : 'UAH',
			},
			{
				label : 'UGX',
				value : 'UGX',
			},
			{
				label : 'UYU',
				value : 'UYU',
			},
			{
				label : 'UZS',
				value : 'UZS',
			},
			{
				label : 'VEF',
				value : 'VEF',
			},
			{
				label : 'VND',
				value : 'VND',
			},
			{
				label : 'VUV',
				value : 'VUV',
			},
			{
				label : 'WST',
				value : 'WST',
			},
			{
				label : 'XAF',
				value : 'XAF',
			},
			{
				label : 'XCD',
				value : 'XCD',
			},
			{
				label : 'YER',
				value : 'YER',
			},
			{
				label : 'ZAR',
				value : 'ZAR',
			},
			{
				label : 'ZMW',
				value : 'ZMW',
			},
		],
	},
];

export default filterControls;
