const getCompanyControls = (organizationDetails = {}) => [
	{
		name: 'business_name',
		label: 'Business Name',
		type: 'text',
		span: 4,
		value: organizationDetails.business_name,
		rules: {
			required: true,
		},
	},
	{
		name: 'registration_number',
		className: 'toUpperCase',
		label: 'PAN / Registration Number',
		type: 'text',
		span: 4,
		value: organizationDetails.registration_number,
		rules: {
			required: true,
		},
	},
	{
		name: 'country_id',
		label: 'Country of Registration',
		type: 'location-select',
		optionsListKey: 'locations',
		params: { filters: { type: ['country'] } },
		defaultOptions: true,
		span: 4,
		value: organizationDetails.country_id,
		rules: {
			required: true,
		},
		disabled: true,
	},
	{
		id: 'cp-lsp__onboarding__organizationDetails__company_type',
		label: 'Type of Company',
		name: 'company_type',
		type: 'select',
		span: 4,
		rules: {
			required: true,
		},
		value: organizationDetails.company_type,
	},
];

export default getCompanyControls;
