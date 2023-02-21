const getConfigAddressControls = ({ t = () => {} }) => {
	const translationKey =
		'common:components.addressForm.configurations.addressControls';
	return [
		// {
		// 	name: 'gst_list',
		// 	type: 'pills',
		// 	// span: 12,
		// 	style: {
		// 		flexBasis: '100%',
		// 	},
		// 	className: 'primary md',
		// 	showIn: ['billingAddress'],
		// },
		{
			type: 'text',
			name: 'tax_number',
			label: t(`${translationKey}.tax_number.label`),
			className: 'uppercase',
			maxLength: 15,
			rules: {
				required: true,
			},
			// span: 6,
			style: {
				flexBasis: '50%',
			},
			showIn: ['billingAddress'],
		},
		{
			type: 'select',
			name: 'address_type',
			label: t(`${translationKey}.address_type.label`),
			options: [
				{
					label: t(`${translationKey}.address_type.options.1`),
					value: 'office',
				},
				{
					label: t(`${translationKey}.address_type.options.2`),
					value: 'factory',
				},
				{
					label: t(`${translationKey}.address_type.options.3`),
					value: 'warehouse',
				},
			],
			rules: { required: true },
			// span: 6,
			style: {
				flexBasis: '50%',
			},
			showIn: ['otherAddress'],
		},
		{
			type: 'text',
			name: 'name',
			label: t(`${translationKey}.name.label`),
			rules: { required: true },
			// span: 6,
			style: {
				flexBasis: '50%',
			},
			showIn: ['billingAddress', 'otherAddress'],
		},
		{
			type: 'location-select',
			name: 'country_id',
			label: t(`${translationKey}.country_id.label`),
			optionsListKey: 'locations',
			params: { filters: { type: ['country'] } },
			defaultOptions: true,
			rules: { required: true },
			// span: 6,
			style: {
				flexBasis: '50%',
			},
			showIn: ['otherAddress'],
		},
		{
			type: 'file',
			name: 'tax_number_document_url',
			label: t(`${translationKey}.tax_number_document_url.label`),
			uploadType: 'aws',
			drag: true,
			height: 45,
			rules: { required: true },
			// span: 12,
			style: {
				flexBasis: '100%',
			},
			showIn: ['billingAddress'],
		},
		{
			type: 'location-select',
			name: 'pincode',
			label: t(`${translationKey}.pincode.label`),
			optionsListKey: 'locations',
			labelKey: 'postal_code',
			valueKey: 'postal_code',
			params: { filters: { type: ['pincode'] } },
			caret: true,
			rules: { required: true },
			// span: 6,
			style: {
				flexBasis: '50%',
			},
			showIn: ['billingAddress', 'otherAddress'],
		},
		{
			type: 'textarea',
			name: 'address',
			label: t(`${translationKey}.address.label`),
			rules: { required: true },
			// span: 6,
			style: {
				flexBasis: '50%',
			},
			showIn: ['billingAddress', 'otherAddress'],
		},
		{
			type: 'checkbox',
			label: t(`${translationKey}.is_sez.options.1`),
			name: 'is_sez',
			options: [
				{ value: true, label: t(`${translationKey}.is_sez.options.1`) },
			],
			multiple: true,
			// span: 12,
			style: {
				flexBasis: '100%',
			},
			showIn: ['billingAddress'],
		},
		{
			type: 'file',
			name: 'sez_proof',
			label: t(`${translationKey}.sez_proof.label`),
			uploadType: 'aws',
			drag: true,
			height: 45,
			rules: { required: true },
			// span: 12,
			style: {
				flexBasis: '100%',
			},
			showIn: ['billingAddress'],
		},
	];
};

export default getConfigAddressControls;
