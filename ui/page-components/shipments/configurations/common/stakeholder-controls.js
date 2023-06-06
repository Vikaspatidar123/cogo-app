import patterns from '@/ui/commons/configurations/patterns';

export const controls = [
	{
		name           : 'company_name',
		label          : 'Company name',
		valueKey       : 'company_name',
		labelKey       : 'company_name',
		asyncKey       : 'trade_contacts',
		type           : 'async_select',
		span           : 4,
		defaultOptions : true,
		placeholder    : 'Type Company name',
		rules          : { required: 'Company name is Required' },
	},
	{
		name        : 'tax_number',
		label       : 'TAX Number (GST/VAT)',
		type        : 'text',
		span        : 4,
		placeholder : 'TAX Number (GST/VAT)',
		rules       : {
			required : 'Required',
			pattern  : {
				value   : patterns.PAN_NUMBER,
				message : 'Please enter a valid PAN',
			},
		},
	},
	{
		name        : 'registration_number',
		label       : 'Registration number',
		type        : 'text',
		span        : 4,
		placeholder : 'Registration number',
	},
	{
		name        : 'name',
		label       : 'Poc name',
		type        : 'text',
		span        : 4,
		placeholder : 'Type Poc name',
		rules       : { required: 'Poc name is Required' },
	},
	{
		name        : 'email',
		label       : 'Email ID',
		type        : 'email',
		span        : 4,
		placeholder : 'Type Email ID',
		rules       : {
			required : 'Email ID is Required or Email is not valid',
			pattern  : {
				value   : patterns.EMAIL,
				message : 'You have entered an invalid email address!',
			},
		},
	},
	{
		name         : 'mobile',
		showLabel    : false,
		type         : 'mobile-number-select',
		codeKey      : 'mobile_country_code',
		value        : { mobile_country_code: '+91' },
		numberKey    : 'mobile_number',
		inputType    : 'number',
		label        : 'Please verify your contact number',
		placeholder  : 'Enter Phone Number/ Landline number',
		showOptional : false,
		span         : 4,
		rules        : {
			required : true,
			validate : (value) => (value?.mobile_country_code && value?.mobile_number
				? undefined
				: 'Mobile Number is Required'),
		},
	},
	{
		name        : 'address',
		label       : 'Address',
		type        : 'textarea',
		span        : 4,
		placeholder : 'Type name',
		rules       : { required: 'Address is Required' },
	},
	{
<<<<<<< HEAD
		name           : 'pincode',
		type           : 'location-select',
		optionsListKey : 'locations',
		params         : { filters: { type: ['pincode'] } },
		label          : 'Pincode / Zip Code',
		labelKey       : 'postal_code',
		valueKey       : 'postal_code',
		span           : 4,
		placeholder    : 'Enter pincode',
		rules          : { required: 'Please provide the asked information' },
=======
		name        : 'pincode',
		type        : 'async_select',
		asyncKey    : 'locations',
		params      : { filters: { type: ['pincode'] } },
		label       : 'Pincode / Zip Code',
		labelKey    : 'postal_code',
		valueKey    : 'postal_code',
		span        : 4,
		placeholder : 'Enter pincode',
		rules       : { required: 'Please provide the asked information' },
>>>>>>> 2e0d284014605794e2b73e4fde898b876c6d79be
	},
	{
		name           : 'country_id',
		type           : 'select',
		label          : 'Country',
		span           : 4,
<<<<<<< HEAD
		optionsListKey : 'countries',
=======
		optionKey      : 'countries',
>>>>>>> 2e0d284014605794e2b73e4fde898b876c6d79be
		params         : { filters: { type: ['country'] } },
		defaultOptions : true,
		placeholder    : 'Select Country',
		rules          : { required: 'Country is required' },
	},
];
