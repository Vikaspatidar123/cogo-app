import patterns from '@/ui/commons/configurations/patterns';

export const mobileValidator = /^[0-9]{10}$/;

export const addAddressControls = (countryInfo, stateInfo, mobileCode) => [
	{
		label       : 'POC Name',
		name        : 'name',
		type        : 'text',
		placeholder : 'Enter POC Name',
		valueKey    : 'business_name',
		rulues      : { required: true },
	},
	{
		label       : 'Billing Party Name',
		name        : 'billingPartyName',
		type        : 'text',
		placeholder : 'Enter Billing Party Name',
		rulues      : { required: true },
		// valueKey: 'business_name',
	},
	{
		label       : 'Email Id *',
		name        : 'email',
		type        : 'text',
		placeholder : 'Enter Email Id',
		style       : { height: '42px' },
		rules       : {
			required : true,
			pattern  : {
				value   : patterns.EMAIL,
				message : 'Invalid email address',
			},
		},
	},
	{
		label       : 'Phone Number *',
		name        : 'phoneNumber',
		type        : 'mobile-select',
		placeholder : 'Enter Phone Number',
		rules       : {
			required : true,
			pattern  : {
				value   : mobileValidator,
				message : 'Invalid phone number',
			},
		},
	},

	{
		label       : 'Tax Number *',
		name        : 'taxNumber',
		type        : 'text',
		placeholder : 'Enter Tax Number',
		rules       : {
			required : true,
			pattern  : {
				value   : patterns.GST_NUMBER,
				message : 'Invalid phone number',
			},
		},
	},
	{
		label       : 'Address line *',
		name        : 'address',
		type        : 'text',
		placeholder : 'Enter Address',
		rules       : { required: true },
	},

	{
		label          : 'Country *',
		name           : 'country',
		// type: 'select',
		type           : 'select',
		placeholder    : 'Enter Country',
		className      : 'primary md',
		rules          : { required: true },
		optionsListKey : 'countries',
		valueKey       : 'id',
		// defaultOptions: true,
		disabled       : !mobileCode?.country_code,
		params         : {
			filters: {
				type                : 'country',
				mobile_country_code : mobileCode?.country_code,
			},
		},
	},
	{
		label          : 'State (optional)',
		name           : 'state',
		type           : 'select',
		placeholder    : 'Enter State',
		optionsListKey : 'locations',
		disabled       : !countryInfo.id,
		params         : {
			filters: { type: 'region', country_id: countryInfo.id },
		},
	},
	{
		label       : 'Pincode *',
		name        : 'pincode',
		type        : 'text',
		placeholder : 'Enter Pincode',
		style       : { height: '40px' },
		rules       : { required: true },
	},
	{
		label          : 'City (optional)',
		name           : 'city',
		type           : 'text',
		placeholder    : 'Enter City',
		optionsListKey : 'locations',
		disabled       : !stateInfo.id,
		params         : {
			filters: { type: 'city', region_id: stateInfo.id },
		},
	},
];
