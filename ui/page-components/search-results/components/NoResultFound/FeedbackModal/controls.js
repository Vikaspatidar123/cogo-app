import GLOBAL_CONSTANTS from '@/ui/commons/constants/globals';

const CURRENCY_CODE_OPTIONS = [
	GLOBAL_CONSTANTS.currency_code.USD,
	GLOBAL_CONSTANTS.currency_code.INR,
	GLOBAL_CONSTANTS.currency_code.EUR,
	GLOBAL_CONSTANTS.currency_code.GBP,
	GLOBAL_CONSTANTS.currency_code.VND,
].map((currencyCode) => ({
	label : currencyCode,
	value : currencyCode,
}));

const controls = ({ airlineOptions = [] }) => ({
	fcl_freight: [
		{
			name         : 'preferred_freight_rate_currency',
			label        : 'Currency',
			type         : 'select',
			caret        : true,
			options      : CURRENCY_CODE_OPTIONS,
			showOptional : false,
		},

		{
			name         : 'preferred_freight_rate',
			label        : 'Indicative Rate',
			type         : 'number',
			showOptional : false,
		},
		{
			name  : 'cargo_readiness_date',
			label : 'Cargo Ready Date',
			type  : 'datepicker',
			rules : { required: 'Required' },
		},
		{
			name           : 'preferred_shipping_line_ids',
			type           : 'select',
			optionsListKey : 'shipping-lines',
			defaultOptions : true,
			caret          : true,
			label          : 'Preferred Shipping lines',
			multiple       : true,
			autoCloseMenu  : false,
			placeholder:
					"Enter preferred shipping line only if customer won't accept any other line",
			showOptional: false,
		},
		{
			name         : 'remarks',
			type         : 'text',
			label        : 'Remarks',
			showOptional : false,
			placeholder:
					'Please add commodity details and other specific requirements here...',
			rules     : { required: 'Required' },
			className : 'primary sm',
		},
	],
	air_freight: [
		{
			name         : 'preferred_freight_rate_currency',
			label        : 'Currency',
			type         : 'select',
			caret        : true,
			options      : CURRENCY_CODE_OPTIONS,
			showOptional : false,
		},
		{
			name         : 'preferred_freight_rate',
			label        : 'Indicative Rate',
			type         : 'number',
			showOptional : false,
		},
		{
			name  : 'cargo_readiness_date',
			label : 'Cargo Ready Date',
			type  : 'datepicker',
		},
		{
			name           : 'preferred_airline_ids',
			type           : 'select',
			optionsListKey : 'air-lines',
			defaultOptions : airlineOptions,
			caret          : true,
			label          : 'Preferred Air lines',
			multiple       : true,
			autoCloseMenu  : false,
			placeholder:
					"Enter preferred airline line only if customer won't accept any other line",
			showOptional : false,
			rules        : { required: true },
		},
		{
			name         : 'remarks',
			type         : 'text',
			label        : 'Remarks',
			showOptional : false,
			placeholder:
					'Please add commodity details and other specific requirements here...',
			rules: { required: 'Required' },
		},
	],
	ftl_freight: [
		{
			name         : 'preferred_freight_rate_currency',
			label        : 'Currency',
			type         : 'select',
			caret        : true,
			options      : CURRENCY_CODE_OPTIONS,
			showOptional : false,
		},
		{
			name         : 'preferred_freight_rate',
			label        : 'Indicative Rate',
			type         : 'number',
			showOptional : false,
		},
		{
			name  : 'cargo_readiness_date',
			label : 'Cargo Ready Date',
			type  : 'datepicker',
		},
		{
			name         : 'remarks',
			type         : 'text',
			label        : 'Remarks',
			showOptional : false,
			rules        : { required: 'Required' },
			placeholder:
					'Please add commodity details and other specific requirements here...',
		},
	],
	lcl_freight: [
		{
			name         : 'preferred_freight_rate_currency',
			label        : 'Currency',
			type         : 'select',
			caret        : true,
			options      : CURRENCY_CODE_OPTIONS,
			showOptional : false,
		},
		{
			name         : 'preferred_freight_rate',
			label        : 'Indicative Rate',
			type         : 'number',
			showOptional : false,
		},
		{
			name  : 'cargo_readiness_date',
			label : 'Cargo Ready Date',
			type  : 'datepicker',
			rules : { required: 'Required' },
		},
		{
			name         : 'remarks',
			type         : 'text',
			label        : 'Remarks',
			showOptional : false,
			rules        : { required: 'Required' },
			placeholder:
					'Please add commodity details and other specific requirements here...',
		},
	],
	ltl_freight: [
		{
			name         : 'preferred_freight_rate_currency',
			label        : 'Currency',
			type         : 'select',
			caret        : true,
			options      : CURRENCY_CODE_OPTIONS,
			showOptional : false,
		},
		{
			name         : 'preferred_freight_rate',
			label        : 'Indicative Rate',
			type         : 'number',
			showOptional : false,
		},
		{
			name         : 'remarks',
			type         : 'text',
			label        : 'Remarks',
			showOptional : false,
			rules        : { required: 'Required' },
			placeholder:
					'Please add commodity details and other specific requirements here...',
		},
	],
	fcl_customs: [
		{
			name         : 'preferred_freight_rate_currency',
			label        : 'Currency',
			type         : 'select',
			caret        : true,
			options      : CURRENCY_CODE_OPTIONS,
			showOptional : false,
		},
		{
			name         : 'preferred_freight_rate',
			label        : 'Indicative Rate',
			type         : 'number',
			showOptional : false,
		},
		{
			name         : 'remarks',
			type         : 'text',
			label        : 'Remarks',
			showOptional : false,
			rules        : { required: 'Required' },
			placeholder:
					'Please add commodity details and other specific requirements here...',
		},
	],
	fcl_cfs: [
		{
			name         : 'preferred_freight_rate_currency',
			label        : 'Currency',
			type         : 'select',
			caret        : true,
			options      : CURRENCY_CODE_OPTIONS,
			showOptional : false,
		},
		{
			name         : 'preferred_freight_rate',
			label        : 'Indicative Rate',
			type         : 'number',
			showOptional : false,
		},
		{
			name         : 'remarks',
			type         : 'text',
			label        : 'Remarks',
			showOptional : false,
			rules        : { required: 'Required' },
			placeholder:
					'Please add commodity details and other specific requirements here...',
		},
	],
	lcl_customs: [
		{
			name         : 'preferred_freight_rate_currency',
			label        : 'Currency',
			type         : 'select',
			caret        : true,
			options      : CURRENCY_CODE_OPTIONS,
			showOptional : false,

		},
		{
			name         : 'preferred_freight_rate',
			label        : 'Indicative Rate',
			type         : 'number',
			showOptional : false,

		},
		{
			name         : 'remarks',
			type         : 'text',
			label        : 'Remarks',
			showOptional : false,

			rules: { required: 'Required' },
			placeholder:
					'Please add commodity details and other specific requirements here...',

		},
	],
	air_customs: [
		{
			name         : 'preferred_freight_rate_currency',
			label        : 'Currency',
			type         : 'select',
			caret        : true,
			options      : CURRENCY_CODE_OPTIONS,
			showOptional : false,

		},
		{
			name         : 'preferred_freight_rate',
			label        : 'Indicative Rate',
			type         : 'number',
			showOptional : false,

		},

		{
			name         : 'remarks',
			type         : 'text',
			label        : 'Remarks',
			showOptional : false,

			rules: { required: 'Required' },
			placeholder:
					'Please add commodity details and other specific requirements here...',

		},
	],
	haulage_freight: [
		{
			name         : 'preferred_freight_rate_currency',
			label        : 'Currency',
			type         : 'select',
			caret        : true,
			options      : CURRENCY_CODE_OPTIONS,
			showOptional : false,

		},
		{
			name         : 'preferred_freight_rate',
			label        : 'Indicative Rate',
			type         : 'number',
			showOptional : false,

		},

		{
			name         : 'remarks',
			type         : 'text',
			label        : 'Remarks',
			showOptional : false,

			rules: { required: 'Required' },
			placeholder:
					'Please add commodity details and other specific requirements here...',

		},
	],
	fcl_freight_local: [
		{
			name         : 'preferred_freight_rate_currency',
			label        : 'Currency',
			type         : 'select',
			caret        : true,
			options      : CURRENCY_CODE_OPTIONS,
			showOptional : false,

		},
		{
			name         : 'preferred_freight_rate',
			label        : 'Indicative Rate',
			type         : 'number',
			showOptional : false,

		},

		{
			name         : 'remarks',
			type         : 'text',
			label        : 'Remarks',
			showOptional : false,

			rules: { required: 'Required' },
			placeholder:
					'Please add commodity details and other specific requirements here...',

		},
	],
	trailer_freight: [
		{
			name         : 'preferred_freight_rate_currency',
			label        : 'Currency',
			type         : 'select',
			caret        : true,
			options      : CURRENCY_CODE_OPTIONS,
			showOptional : false,

		},
		{
			name         : 'preferred_freight_rate',
			label        : 'Indicative Rate',
			type         : 'number',
			showOptional : false,

		},

		{
			name         : 'remarks',
			type         : 'text',
			label        : 'Remarks',
			showOptional : false,

			rules: { required: 'Required' },
			placeholder:
					'Please add commodity details and other specific requirements here...',

		},
	],
	subsidiary: [
		{
			name         : 'preferred_freight_rate_currency',
			label        : 'Currency',
			type         : 'select',
			caret        : true,
			options      : CURRENCY_CODE_OPTIONS,
			showOptional : false,

		},
		{
			name         : 'preferred_freight_rate',
			label        : 'Indicative Rate',
			type         : 'number',
			showOptional : false,

		},
		{
			name         : 'remarks',
			type         : 'text',
			label        : 'Remarks',
			showOptional : false,

			rules: { required: 'Required' },
			placeholder:
					'Please add commodity details and other specific requirements here...',

		},
	],
});

export default controls;
