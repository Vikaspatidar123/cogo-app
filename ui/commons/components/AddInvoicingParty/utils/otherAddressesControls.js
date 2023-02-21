const translationKey =
	'common:components.addInvoicingParty.utils.controls.otherAddressesControls';

const getControls = ({ t = () => {} }) => {
	return [
		{
			name: 'name',
			label: t(`${translationKey}.name.label`),
			type: 'text',
			style: {
				flexBasis: '50%',
			},
			rules: { required: true },
		},
		{
			name: 'address_type',
			label: t(`${translationKey}.address_type.label`),
			type: 'select',
			style: {
				flexBasis: '50%',
			},
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
		},
		{
			name: 'country_id',
			label: t(`${translationKey}.country_id.label`),
			type: 'select',
			optionsListKey: 'countries',
			style: {
				flexBasis: '50%',
			},
			rules: { required: true },
		},
		{
			name: 'pincode',
			label: t(`${translationKey}.pincode.label`),
			labelKey: 'postal_code',
			valueKey: 'postal_code',
			type: 'location-select',
			optionsListKey: 'locations',
			params: { filters: { type: ['pincode'] } },
			caret: true,
			style: {
				flexBasis: '50%',
			},
			rules: { required: true },
		},

		{
			name: 'address',
			label: t(`${translationKey}.address.label`),
			type: 'textarea',
			style: {
				flexBasis: '50%',
			},
			rules: { required: true },
		},
	];
};

const getOtherAddressControls = ({ values = {}, t = () => {} }) => {
	const controls = getControls({ t });
	return controls.map((control) => {
		return { ...control, value: values[control.name] || '' };
	});
};

export default getOtherAddressControls;
