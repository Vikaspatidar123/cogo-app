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
			labelShow    : 'Currency',
			type         : 'select',
			caret        : true,
			options      : CURRENCY_CODE_OPTIONS,
			showOptional : false,
			style        : { width: '150px' },
		},

		{
			name         : 'preferred_freight_rate',
			labelShow    : 'Indicative Rate',
			type         : 'number',
			showOptional : false,
			style        : { width: '150px' },
		},
		{
			name      : 'cargo_readiness_date',
			labelShow : 'Cargo Ready Date',
			type      : 'datepicker',
			rules     : { required: 'Required' },
			style     : { width: '150px' },
		},
		{
			name          : 'preferred_shipping_line_ids',
			type          : 'async_select',
			asyncKey      : 'shipping-lines',
			initialCall   : true,
			caret         : true,
			labelShow     : 'Preferred Shipping lines',
			multiple      : true,
			autoCloseMenu : false,
			placeholder:
        "Enter preferred shipping line only if customer won't accept any other line",
			showOptional : false,
			style        : { width: '550px' },
		},
		{
			name         : 'remarks',
			type         : 'textarea',
			labelShow    : 'Remarks',
			showOptional : false,
			placeholder:
        'Please add commodity details and other specific requirements here...',
			rules     : { required: 'Required' },
			className : 'primary sm',
			style     : { width: '550px' },
		},
	],
	air_freight: [
		{
			name         : 'preferred_freight_rate_currency',
			labelShow    : 'Currency',
			type         : 'select',
			caret        : true,
			options      : CURRENCY_CODE_OPTIONS,
			showOptional : false,
			style        : { width: '150px' },
		},
		{
			name         : 'preferred_freight_rate',
			labelShow    : 'Indicative Rate',
			type         : 'number',
			showOptional : false,
			style        : { width: '150px' },
		},
		{
			name      : 'cargo_readiness_date',
			labelShow : 'Cargo Ready Date',
			type      : 'datepicker',
			style     : { width: '150px' },
		},
		{
			name          : 'preferred_airline_ids',
			type          : 'select',
			asyncKey      : 'air-lines',
			initialCall   : airlineOptions,
			caret         : true,
			labelShow     : 'Preferred Air lines',
			multiple      : true,
			autoCloseMenu : false,
			placeholder:
        "Enter preferred airline line only if customer won't accept any other line",
			showOptional : false,
			rules        : { required: true },
			style        : { width: '550px' },
		},
		{
			name         : 'remarks',
			type         : 'text',
			labelShow    : 'Remarks',
			showOptional : false,
			placeholder:
        'Please add commodity details and other specific requirements here...',
			rules : { required: 'Required' },
			style : { width: '550px' },
		},
	],
	ftl_freight: [
		{
			name         : 'preferred_freight_rate_currency',
			labelShow    : 'Currency',
			type         : 'select',
			caret        : true,
			options      : CURRENCY_CODE_OPTIONS,
			showOptional : false,
			style        : { width: '150px' },
		},
		{
			name         : 'preferred_freight_rate',
			labelShow    : 'Indicative Rate',
			type         : 'number',
			showOptional : false,
			style        : { width: '150px' },
		},
		{
			name      : 'cargo_readiness_date',
			labelShow : 'Cargo Ready Date',
			type      : 'datepicker',
			style     : { width: '150px' },
		},
		{
			name         : 'remarks',
			type         : 'text',
			labelShow    : 'Remarks',
			showOptional : false,
			rules        : { required: 'Required' },
			style        : { width: '550px' },
			placeholder:
        'Please add commodity details and other specific requirements here...',
		},
	],
	lcl_freight: [
		{
			name         : 'preferred_freight_rate_currency',
			labelShow    : 'Currency',
			type         : 'select',
			caret        : true,
			options      : CURRENCY_CODE_OPTIONS,
			showOptional : false,
			style        : { width: '150px' },
		},
		{
			name         : 'preferred_freight_rate',
			labelShow    : 'Indicative Rate',
			type         : 'number',
			showOptional : false,
			style        : { width: '150px' },
		},
		{
			name      : 'cargo_readiness_date',
			labelShow : 'Cargo Ready Date',
			type      : 'datepicker',
			rules     : { required: 'Required' },
			style     : { width: '150px' },
		},
		{
			name         : 'remarks',
			type         : 'text',
			labelShow    : 'Remarks',
			showOptional : false,
			rules        : { required: 'Required' },
			style        : { width: '550px' },

			placeholder:
        'Please add commodity details and other specific requirements here...',
		},
	],
	ltl_freight: [
		{
			name         : 'preferred_freight_rate_currency',
			labelShow    : 'Currency',
			type         : 'select',
			caret        : true,
			options      : CURRENCY_CODE_OPTIONS,
			showOptional : false,
			style        : { width: '150px' },
		},
		{
			name         : 'preferred_freight_rate',
			labelShow    : 'Indicative Rate',
			type         : 'number',
			showOptional : false,
			style        : { width: '150px' },
		},
		{
			name         : 'remarks',
			type         : 'text',
			labelShow    : 'Remarks',
			showOptional : false,
			rules        : { required: 'Required' },
			style        : { width: '550px' },

			placeholder:
        'Please add commodity details and other specific requirements here...',
		},
	],
	fcl_customs: [
		{
			name         : 'preferred_freight_rate_currency',
			labelShow    : 'Currency',
			type         : 'select',
			caret        : true,
			options      : CURRENCY_CODE_OPTIONS,
			showOptional : false,
			style        : { width: '150px' },
		},
		{
			name         : 'preferred_freight_rate',
			labelShow    : 'Indicative Rate',
			type         : 'number',
			showOptional : false,
			style        : { width: '150px' },
		},
		{
			name         : 'remarks',
			type         : 'text',
			labelShow    : 'Remarks',
			showOptional : false,
			rules        : { required: 'Required' },
			style        : { width: '550px' },

			placeholder:
        'Please add commodity details and other specific requirements here...',
		},
	],
	fcl_cfs: [
		{
			name         : 'preferred_freight_rate_currency',
			labelShow    : 'Currency',
			type         : 'select',
			caret        : true,
			options      : CURRENCY_CODE_OPTIONS,
			showOptional : false,
			style        : { width: '150px' },
		},
		{
			name         : 'preferred_freight_rate',
			labelShow    : 'Indicative Rate',
			type         : 'number',
			showOptional : false,
			style        : { width: '150px' },
		},
		{
			name         : 'remarks',
			type         : 'text',
			labelShow    : 'Remarks',
			showOptional : false,
			rules        : { required: 'Required' },
			style        : { width: '550px' },

			placeholder:
        'Please add commodity details and other specific requirements here...',
		},
	],
	lcl_customs: [
		{
			name         : 'preferred_freight_rate_currency',
			labelShow    : 'Currency',
			type         : 'select',
			caret        : true,
			options      : CURRENCY_CODE_OPTIONS,
			showOptional : false,
			style        : { width: '150px' },
		},
		{
			name         : 'preferred_freight_rate',
			labelShow    : 'Indicative Rate',
			type         : 'number',
			showOptional : false,
			style        : { width: '150px' },
		},
		{
			name         : 'remarks',
			type         : 'text',
			labelShow    : 'Remarks',
			showOptional : false,
			style        : { width: '550px' },

			rules: { required: 'Required' },
			placeholder:
        'Please add commodity details and other specific requirements here...',
		},
	],
	air_customs: [
		{
			name         : 'preferred_freight_rate_currency',
			labelShow    : 'Currency',
			type         : 'select',
			caret        : true,
			options      : CURRENCY_CODE_OPTIONS,
			showOptional : false,
			style        : { width: '150px' },
		},
		{
			name         : 'preferred_freight_rate',
			labelShow    : 'Indicative Rate',
			type         : 'number',
			showOptional : false,
			style        : { width: '150px' },
		},

		{
			name         : 'remarks',
			type         : 'text',
			labelShow    : 'Remarks',
			showOptional : false,
			style        : { width: '550px' },

			rules: { required: 'Required' },
			placeholder:
        'Please add commodity details and other specific requirements here...',
		},
	],
	haulage_freight: [
		{
			name         : 'preferred_freight_rate_currency',
			labelShow    : 'Currency',
			type         : 'select',
			caret        : true,
			options      : CURRENCY_CODE_OPTIONS,
			showOptional : false,
			style        : { width: '150px' },
		},
		{
			name         : 'preferred_freight_rate',
			labelShow    : 'Indicative Rate',
			type         : 'number',
			showOptional : false,
			style        : { width: '150px' },
		},

		{
			name         : 'remarks',
			type         : 'text',
			labelShow    : 'Remarks',
			showOptional : false,

			rules: { required: 'Required' },
			placeholder:
        'Please add commodity details and other specific requirements here...',
		},
	],
	fcl_freight_local: [
		{
			name         : 'preferred_freight_rate_currency',
			labelShow    : 'Currency',
			type         : 'select',
			caret        : true,
			options      : CURRENCY_CODE_OPTIONS,
			showOptional : false,
	  style        : { width: '150px' },

		},
		{
			name         : 'preferred_freight_rate',
			labelShow    : 'Indicative Rate',
			type         : 'number',
			showOptional : false,
	  style        : { width: '150px' },

		},

		{
			name         : 'remarks',
			type         : 'text',
			labelShow    : 'Remarks',
			showOptional : false,
	  style        : { width: '550px' },

			rules: { required: 'Required' },
			placeholder:
        'Please add commodity details and other specific requirements here...',
		},
	],
	trailer_freight: [
		{
			name         : 'preferred_freight_rate_currency',
			labelShow    : 'Currency',
			type         : 'select',
			caret        : true,
			options      : CURRENCY_CODE_OPTIONS,
			showOptional : false,
	  style        : { width: '150px' },

		},
		{
			name         : 'preferred_freight_rate',
			labelShow    : 'Indicative Rate',
			type         : 'number',
			showOptional : false,
			style        : { width: '150px' },

		},

		{
			name         : 'remarks',
			type         : 'text',
			labelShow    : 'Remarks',
			showOptional : false,
			style        : { width: '550px' },

			rules: { required: 'Required' },
			placeholder:
        'Please add commodity details and other specific requirements here...',
		},
	],
	subsidiary: [
		{
			name         : 'preferred_freight_rate_currency',
			labelShow    : 'Currency',
			type         : 'select',
			caret        : true,
			options      : CURRENCY_CODE_OPTIONS,
			showOptional : false,
			style        : { width: '150px' },

		},
		{
			name         : 'preferred_freight_rate',
			labelShow    : 'Indicative Rate',
			type         : 'number',
			showOptional : false,
			style        : { width: '150px' },

		},
		{
			name         : 'remarks',
			type         : 'text',
			labelShow    : 'Remarks',
			showOptional : false,
			style        : { width: '550px' },

			rules: { required: 'Required' },
			placeholder:
        'Please add commodity details and other specific requirements here...',
		},
	],
});

export default controls;
