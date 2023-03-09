import setExpiryDate from '../utils/setExpiryDate';

const headerControls = ({ id = '', organization = {} }) => [
	{
		name        : 'buyerDetails',
		key         : 'BuyerDetails',
		placeholder : 'Select Buyer',
		type        : 'async_select',
		isClearable : true,
		asyncKey    : 'list_partner_quotation',
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
		key         : 'currency',
		placeholder : 'Currency',
		label       : 'Currency',
		type        : 'select',
		isClearable : true,
		size        : 'sm',
		options     : [
			{ label: 'INR', value: 'INR' },
			{ label: 'USD', value: 'USD' },
		],
		value : organization?.country?.currency_code || 'INR',
		rules : { required: true },
		style : { width: '120px' },
	},
	{
		name        : 'expiryDate',
		key         : 'expiryDate',
		placeholder : 'DD/MM/YY',
		value       : setExpiryDate(),
		type        : 'datepicker',
		label       : 'Set Expiry Date',
		isClearable : true,
		minDate     : new Date(),
		rules       : { required: true },
	},

];

export default headerControls;
