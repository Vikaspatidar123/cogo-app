import GLOBAL_CONSTANTS from '@/ui/commons/constants/globals';

const headerControls = ({ id = '', organization = {} }) => [
	{
		name        : 'buyerId',
		placeholder : 'Select Buyer',
		type        : 'async_select',
		isClearable : true,
		asyncKey    : 'list_partner_quotation',
		initialCall : true,
		params      : {
			userId                  : id,
			partnerOrganizationType : 'BUYER',
			pageLimit               : 1000,
			organizationId          : organization?.id,
		},
		size  : 'md',
		rules : { required: true },

	},
	{
		name        : 'currency',
		placeholder : 'Currency',
		label       : 'Currency',
		type        : 'select',
		isClearable : true,
		size        : 'sm',
		options     : [
			GLOBAL_CONSTANTS.currency_code.INR,
			GLOBAL_CONSTANTS.currency_code.USD,
			GLOBAL_CONSTANTS.currency_code.VND,
			GLOBAL_CONSTANTS.currency_code.SGD,
			GLOBAL_CONSTANTS.currency_code.THB,
			GLOBAL_CONSTANTS.currency_code.IDR,
			GLOBAL_CONSTANTS.currency_code.CNY,
		].map((currencyCode) => ({
			label : currencyCode,
			value : currencyCode,
		})),
		rules : { required: true },
		style : { width: '120px' },
	},
	{
		name        : 'expiryDate',
		placeholder : 'DD/MM/YY',
		type        : 'datepicker',
		label       : 'Set Expiry Date',
		isClearable : true,
		minDate     : new Date(),
		rules       : { required: true },
	},

];

export default headerControls;
