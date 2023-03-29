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
			span         : 4,
			className    : 'primary sm',
		},

		{
			name         : 'preferred_freight_rate',
			label        : 'Indicative Rate',
			type         : 'number',
			showOptional : false,
			span         : 4,
			className    : 'primary sm',
		},
		{
			name  : 'cargo_readiness_date',
			label : 'Cargo Ready Date',
			type  : 'datepicker',
			span  : 4,
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
			showOptional : false,
			span         : 12,
			className    : 'primary sm',
		},
		{
			name         : 'remarks',
			type         : 'text',
			label        : 'Remarks',
			showOptional : false,
			placeholder:
					'Please add commodity details and other specific requirements here...',
			span      : 12,
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
			span         : 4,
			className    : 'primary sm',
		},
		{
			name         : 'preferred_freight_rate',
			label        : 'Indicative Rate',
			type         : 'number',
			showOptional : false,
			span         : 4,
			className    : 'primary sm',
		},
		{
			name  : 'cargo_readiness_date',
			label : 'Cargo Ready Date',
			type  : 'datepicker',
			span  : 4,
			rules : { required: 'Required' },
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
			span         : 12,
			className    : 'primary sm',
		},
		{
			name         : 'remarks',
			type         : 'text',
			label        : 'Remarks',
			showOptional : false,
			span         : 12,
			placeholder:
					'Please add commodity details and other specific requirements here...',
			rules     : { required: 'Required' },
			className : 'primary sm',
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
			span         : 4,
			className    : 'primary sm',
		},
		{
			name         : 'preferred_freight_rate',
			label        : 'Indicative Rate',
			type         : 'number',
			showOptional : false,
			span         : 4,
			className    : 'primary sm',
		},
		{
			name  : 'cargo_readiness_date',
			label : 'Cargo Ready Date',
			type  : 'datepicker',
			span  : 4,
			rules : { required: 'Required' },
		},
		{
			name         : 'remarks',
			type         : 'text',
			label        : 'Remarks',
			showOptional : false,
			span         : 12,
			rules        : { required: 'Required' },
			placeholder:
					'Please add commodity details and other specific requirements here...',
			className: 'primary sm',
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
			span         : 4,
			className    : 'primary sm',
		},
		{
			name         : 'preferred_freight_rate',
			label        : 'Indicative Rate',
			type         : 'number',
			showOptional : false,
			span         : 4,
			className    : 'primary sm',
		},
		{
			name  : 'cargo_readiness_date',
			label : 'Cargo Ready Date',
			type  : 'datepicker',
			span  : 4,
			rules : { required: 'Required' },
		},
		{
			name         : 'remarks',
			type         : 'text',
			label        : 'Remarks',
			showOptional : false,
			span         : 12,
			rules        : { required: 'Required' },
			placeholder:
					'Please add commodity details and other specific requirements here...',
			className: 'primary sm',
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
			span         : 4,
			className    : 'primary sm',
		},
		{
			name         : 'preferred_freight_rate',
			label        : 'Indicative Rate',
			type         : 'number',
			showOptional : false,
			span         : 4,
			className    : 'primary sm',
		},
		{
			name         : 'remarks',
			type         : 'text',
			label        : 'Remarks',
			showOptional : false,
			span         : 12,
			rules        : { required: 'Required' },
			placeholder:
					'Please add commodity details and other specific requirements here...',
			className: 'primary sm',
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
			span         : 4,
			className    : 'primary sm',
		},
		{
			name         : 'preferred_freight_rate',
			label        : 'Indicative Rate',
			type         : 'number',
			showOptional : false,
			span         : 4,
			className    : 'primary sm',
		},
		{
			name         : 'remarks',
			type         : 'text',
			label        : 'Remarks',
			showOptional : false,
			span         : 12,
			rules        : { required: 'Required' },
			placeholder:
					'Please add commodity details and other specific requirements here...',
			className: 'primary sm',
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
			span         : 4,
			className    : 'primary sm',
		},
		{
			name         : 'preferred_freight_rate',
			label        : 'Indicative Rate',
			type         : 'number',
			showOptional : false,
			span         : 4,
			className    : 'primary sm',
		},
		{
			name         : 'remarks',
			type         : 'text',
			label        : 'Remarks',
			showOptional : false,
			span         : 12,
			rules        : { required: 'Required' },
			placeholder:
					'Please add commodity details and other specific requirements here...',
			className: 'primary sm',
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
			span         : 4,
			className    : 'primary sm',
		},
		{
			name         : 'preferred_freight_rate',
			label        : 'Indicative Rate',
			type         : 'number',
			showOptional : false,
			span         : 4,
			className    : 'primary sm',
		},
		{
			name         : 'remarks',
			type         : 'text',
			label        : 'Remarks',
			showOptional : false,
			span         : 12,
			rules        : { required: 'Required' },
			placeholder:
					'Please add commodity details and other specific requirements here...',
			className: 'primary sm',
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
			span         : 4,
			className    : 'primary sm',
		},
		{
			name         : 'preferred_freight_rate',
			label        : 'Indicative Rate',
			type         : 'number',
			showOptional : false,
			span         : 4,
			className    : 'primary sm',
		},

		{
			name         : 'remarks',
			type         : 'text',
			label        : 'Remarks',
			showOptional : false,
			span         : 12,
			rules        : { required: 'Required' },
			placeholder:
					'Please add commodity details and other specific requirements here...',
			className: 'primary sm',
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
			span         : 4,
			className    : 'primary sm',
		},
		{
			name         : 'preferred_freight_rate',
			label        : 'Indicative Rate',
			type         : 'number',
			showOptional : false,
			span         : 4,
			className    : 'primary sm',
		},

		{
			name         : 'remarks',
			type         : 'text',
			label        : 'Remarks',
			showOptional : false,
			span         : 12,
			rules        : { required: 'Required' },
			placeholder:
					'Please add commodity details and other specific requirements here...',
			className: 'primary sm',
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
			span         : 4,
			className    : 'primary sm',
		},
		{
			name         : 'preferred_freight_rate',
			label        : 'Indicative Rate',
			type         : 'number',
			showOptional : false,
			span         : 4,
			className    : 'primary sm',
		},

		{
			name         : 'remarks',
			type         : 'text',
			label        : 'Remarks',
			showOptional : false,
			span         : 12,
			rules        : { required: 'Required' },
			placeholder:
					'Please add commodity details and other specific requirements here...',
			className: 'primary sm',
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
			span         : 4,
			className    : 'primary sm',
		},
		{
			name         : 'preferred_freight_rate',
			label        : 'Indicative Rate',
			type         : 'number',
			showOptional : false,
			span         : 4,
			className    : 'primary sm',
		},

		{
			name         : 'remarks',
			type         : 'text',
			label        : 'Remarks',
			showOptional : false,
			span         : 12,
			rules        : { required: 'Required' },
			placeholder:
					'Please add commodity details and other specific requirements here...',
			className: 'primary sm',
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
			span         : 4,
			className    : 'primary sm',
		},
		{
			name         : 'preferred_freight_rate',
			label        : 'Indicative Rate',
			type         : 'number',
			showOptional : false,
			span         : 4,
			className    : 'primary sm',
		},
		{
			name         : 'remarks',
			type         : 'text',
			label        : 'Remarks',
			showOptional : false,
			span         : 12,
			rules        : { required: 'Required' },
			placeholder:
					'Please add commodity details and other specific requirements here...',
			className: 'primary sm',
		},
	],
});

export default controls;
