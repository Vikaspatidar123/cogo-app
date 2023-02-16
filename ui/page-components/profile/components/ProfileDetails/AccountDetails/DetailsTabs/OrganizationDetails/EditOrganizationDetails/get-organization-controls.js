const getOrganizationControls = () => [
	{
		name: 'city_id',
		labelKey: 'display_name',
		valueKey: 'id',
		label: 'City',
		placeholder: 'Enter city',
		span: 4,
		type: 'select',
		params: { filters: { type: ['city'] } },
		optionsListKey: 'locations',
		showOptional: false,
		// value: organizationData.city_id,
	},
	{
		name: 'website',
		label: 'website',
		placeholder: 'website',
		type: 'text',
		span: 4,
		showOptional: false,
	},
	{
		name: 'logo',
		label: 'logo',
		placeholder: 'logo',
		type: 'file',
		drag: true,
		span: 4,
		accept:
			'image/*,.pdf,.doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document',
		uploadType: 'aws',
		format: ' ',
		rules: { required: 'Required' },
		showOptional: false,
	},
	{
		name: 'about',
		label: 'about',
		placeholder: 'about',
		type: 'textarea',
		span: 4,
		showOptional: false,
	},
];

export default getOrganizationControls;
