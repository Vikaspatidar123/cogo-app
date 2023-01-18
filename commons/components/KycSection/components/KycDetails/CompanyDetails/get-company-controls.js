const getCompanyControls = (partner) => [
	{
		name: 'business_name',
		label: 'Business Name',
		type: 'text',
		span: 4,
		showOptional: false,
		value: partner.business_name,
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
		value: partner.registration_number,
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
		showOptional: false,
		value: partner.country_id,
		rules: {
			required: true,
		},
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
		options: [
			{
				label: 'Private Limited',
				value: 'private_limited',
			},
			{
				label: 'Public Limited',
				value: 'public_limited',
			},
			{
				label: 'Limited Liability Partnership',
				value: 'limited_liability_partnership',
			},
			{
				label: 'Partnership',
				value: 'partnership',
			},
			{
				label: 'Proprietorship',
				value: 'proprietorship',
			},
			{
				label: 'Other',
				value: 'other',
			},
		],
		value: partner.company_type,
	},
];

export default getCompanyControls;
