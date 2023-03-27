const CreateContractsControls = ({ formData }) => {
	const fieldValues = formData.map((itemData) => ({
		max_weight:
			itemData.service_type === 'air_freight' ? itemData.reqCount : undefined,
		max_volume:
			itemData.service_type === 'lcl_freight' ? itemData.reqCount : undefined,
		max_containers_count:
			itemData.service_type === 'fcl_freight' ? itemData.reqCount : undefined,
		selected_rate_card_id : itemData.card,
		spot_search_id        : itemData.search_id,
	}));

	return [
		{
			name        : 'contract_name',
			label       : 'Name your Contract',
			value       : '',
			type        : 'text',
			placeholder : 'Type here...',
			rules       : { required: 'Name is required' },
		},
		{
			name        : 'validity_start',
			label       : 'Validity Start Date',
			type        : 'datepicker',
			placeholder : 'Select start date',
			minDate     : new Date(),
			miniLabel   : '* Contract can be atmost for 1 month',
			rules       : { required: 'Validity Start is required' },
		},
		{
			name        : 'validity_end',
			label       : 'Validity End Date',
			type        : 'datepicker',
			placeholder : 'Select End date',
			minDate     : new Date(),
			rules       : { required: 'Validity End is required' },
		},
		{
			name     : 'search_rate_card_details',
			value    : fieldValues,
			type     : 'fieldArray',
			controls : [
				{
					name     : 'max_containers_count',
					label    : 'Container Count',
					type     : 'number',
					subLabel : '',
					rules    : { required: 'Container Count is required.', min: 50 },
				},
				{
					name     : 'max_volume',
					label    : 'Volume',
					type     : 'number',
					subLabel : 'cbm',
					rules    : { required: 'Volume is required.', min: 50 },
				},
				{
					name     : 'max_weight',
					label    : 'Weight',
					type     : 'number',
					subLabel : 'kgs',
					rules    : { required: 'Weight is required.', min: 50 },
				},
			],
		},
		{
			name    : 'terms_and_conditions',
			value   : '',
			type    : 'checkbox',
			options : [{ label: '', value: true }],
			rules   : { required: 'Check the checkbox' },
		},
	];
};

export default CreateContractsControls;
