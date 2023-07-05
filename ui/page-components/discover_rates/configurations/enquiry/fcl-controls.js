import GLOBAL_CONSTANTS from '@/ui/commons/constants//globals';

const SUPPORTED_COUNTRY_IDS = GLOBAL_CONSTANTS.service_supported_countries
	.feature_supported_service.common.services.fcl_freight.countries;
const fclControls = () => [
	{
		name    : 'free_days_detention_destination',
		label   : 'Free days at destination',
		options : [
			{ value: 7, label: '7 days' },
			{ value: 14, label: '14 days' },
			{ value: 21, label: '21 days' },
			{ value: 28, label: '28 days' },
		],
		type      : 'chips',
		condition : {},
		span      : 12,
		rules     : { required: 'Required' },
	},
	{
		name  : 'preferred_freight_rate_currency',
		label : 'Currency',
		type  : 'select',
		caret : true,
		style : {
			control: {
				fontSize   : '12px',
				lineHeight : '14px',
				color      : 'black',
				minHeight  : '24px',
				height     : '24px',
			},
			indicatorsContainer: { height: '24px' },
		},
		options: [
			GLOBAL_CONSTANTS.currency_code.USD,
			GLOBAL_CONSTANTS.currency_code.INR,
			GLOBAL_CONSTANTS.currency_code.EUR,
			GLOBAL_CONSTANTS.currency_code.GBP,
		].map((currencyCode) => ({
			label : currencyCode,
			value : currencyCode,
		})),
		span        : 4,
		condition   : {},
		placeholder : ' ',
		rules       : { required: 'Required' },
	},
	{
		name       : 'preferred_freight_rate',
		label      : 'Indicative (BAS) Sell Rate',
		type       : 'number',
		span       : 8,
		condition  : {},
		lowerlabel : 'Please enter the indicative rates including your Sales margin',
		rules      : { required: 'Required', min: 0 },
	},
	{
		name    : 'bl_type',
		label   : 'B/L Type',
		type    : 'chips',
		options : [
			{
				value : 'rfs',
				label : 'RFS (Original) - Received For Shipment',
			},
			{
				value : 'sob',
				label : 'SOB (Original) - Shipped on Board',
			},
			{
				value : 'seaway',
				label : 'Seaway (Original) Bill',
			},
		],
		condition : {},
		rules     : { required: 'Required' },
	},
	{
		name        : 'commodity_description',
		label       : 'Cargo Description',
		type        : 'textarea',
		rows        : 3,
		condition   : {},
		placeholder : 'Cargo Description, packaging details, etc.',
		rules       : { required: 'Required', minLength: 5 },
	},
	{
		name                  : 'cargo_readiness_date',
		label                 : 'Expected Sailing Date',
		type                  : 'datepicker',
		isPreviousDaysAllowed : false,
		rules                 : { required: 'Required' },
	},
	{
		name           : 'preferred_shipping_line_ids',
		label          : 'Preferred Shipping lines',
		type           : 'async_select',
		asyncKey       : 'shipping-lines',
		multiple       : true,
		defaultOptions : true,
		caret          : true,
		placeholder    : 'Search via name...',
	},

	{
		name           : 'non_preferred_shipping_line_ids',
		label          : 'Non Preferred Shipping lines',
		type           : 'async_select',
		caret          : true,
		asyncKey       : 'shipping-lines',
		defaultOptions : true,
		multiple       : true,
		placeholder    : 'Search via name...',
	},
	{
		name        : 'remarks',
		label       : 'Comments to Procurement',
		type        : 'textarea',
		rows        : 3,
		condition   : {},
		placeholder : 'Type...',
	},
	{
		name    : 'destination_cargo_handling_type',
		label   : 'Destination Cargo Handling',
		type    : 'chips',
		options : [
			{
				label : 'Direct Port Delivery',
				value : 'direct_port_delivery',
			},
			{
				label : 'Destuffing at Factory',
				value : 'delivery_from_dock',
			},
			{
				label : 'Destuffing at CFS',
				value : 'destuffing_at_dock',
			},
		],
		condition: {
			destination_country : SUPPORTED_COUNTRY_IDS,
			inco_term           : [
				'dap',
				'ddp',
				'dat',
				'fob',
				'fca',
				'fas',
				'cpt',
				'cip',
				'exw',
			],
		},
		rules: { required: 'This is required' },
	},
	{
		name    : 'origin_cargo_handling_type',
		label   : 'Origin Cargo Handling',
		type    : 'chips',
		options : [
			{
				label : 'Stuffing at Factory',
				value : 'stuffing_at_factory',
			},
			{
				label : 'Stuffing at Dock',
				value : 'stuffing_at_dock',
			},
		],
		condition: {
			origin_country : SUPPORTED_COUNTRY_IDS,
			inco_term      : ['dap', 'ddp', 'dat', 'cif', 'cfr', 'cip'],
		},
	},
	{
		name            : 'msds_certificate',
		span            : 12,
		type            : 'file',
		themeType       : 'secondary',
		onlyURLOnChange : true,
		drag            : true,
		uploadIcon      : 'ic-upload',
		label           : 'Upload MSDS certificate',
		accept:
			'image/*,.pdf,.doc,.docx,application/msword,'
			+ 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
		uploadType : 'aws',
		condition  : { is_haz: true },
		rules      : { required: 'Document is required' },
	},
];
export default fclControls;
