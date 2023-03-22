const getPOCControls = ({ org_id, scope, data, task }) => {
	const ifNoAddress = (y, n) => {
		if (
			[
				'update_origin_customs_poc_details',
				'update_finance_poc_details',
				'update_finance_poc',
				'update_origin_transport_poc_details',
				'update_documentation_poc_details',
				'update_factory_warehouse_poc',
				'update_booking_poc',
			].includes(task)
		) {
			return y;
		}
		return n;
	};
	const tradeContactFilters = {};
	if (scope === 'partner') {
		tradeContactFilters.organization_id = org_id;
	}
	return [
		{
			name: 'company_name',
			label: 'Company name',
			valueKey: 'company_name',
			labelKey: 'company_name',
			optionsListKey: 'trade_contacts',
			type: 'creatable-select-2',
			span: 6,
			placeholder: 'Type Company name',
			value: data?.company_name,
			params: { filters: tradeContactFilters },
			validations: [{ type: 'required', message: 'Company name is Required' }],
		},
		{
			name: 'name',
			label: 'Poc name',
			type: 'text',
			span: 6,
			value: data?.name,
			placeholder: 'Type Poc name',
			validations: [{ type: 'required', message: 'Poc name is Required' }],
		},
		{
			name: 'email',
			label: 'Email ID',
			type: 'text',
			span: 6,
			value: data?.email,
			placeholder: 'Type Email ID',
			validations: [{ type: 'required', message: 'Email ID is Required' }],
		},
		{
			name: 'mobile',
			showLabel: false,
			type: 'mobile-number-select',
			codeKey: 'mobile_country_code',
			numberKey: 'mobile_number',
			label: 'Please verify you contact number',
			placeholder: 'Enter Phone Number/ Landline number',
			value: {
				mobile_country_code:
					data?.mobile_numbers?.[0]?.mobile_country_code || '+91',
				mobile_number: data?.mobile_numbers?.[0]?.mobile_number,
			},
			validations: [
				{
					type: 'required',
					message: 'mobile number is required',
					inputType: 'group',
				},
			],
		},
		...ifNoAddress(
			[],
			[
				{
					name: 'address',
					label: 'Address',
					type: 'textarea',
					span: 12,
					placeholder: 'Type name',
					value: data?.address,
					validations: [{ type: 'required', message: 'Address is Required' }],
				},
				{
					name: 'pincode',
					type: 'text',
					labelKey: 'display_name',
					label: 'Pincode / Zip Code',
					span: 6,
					placeholder: 'Enter pincode',
					value: data?.pincode,
					validations: [
						{
							type: 'required',
							message: 'Please provide the asked information',
						},
					],
				},
				{
					name: 'logo_url',
					type: 'file',
					label: 'Company Logo',
					uploadType: 'aws',
					listType: 'image',
					value: data?.logo_url,
					span: 6,
					onlyURLOnChange: true,
				},
			],
		),
		{
			name: 'country_id',
			type: 'location-select',
			label: 'Country',
			optionsListKey: 'locations',
			value: data?.country_id,
			params: { filters: { type: ['country'] } },
			defaultOptions: true,
			placeholder: 'Select Country',
			validations: [{ type: 'required', message: 'Country is required' }],
		},
	];
};

export default getPOCControls;
