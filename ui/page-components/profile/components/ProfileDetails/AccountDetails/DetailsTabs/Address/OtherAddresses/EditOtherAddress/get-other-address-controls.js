const getOtherAddressControls = ({ valuesToPrefill = {} }) => [
	{
		name: 'name',
		label: 'name',
		placeholder: 'name',
		type: 'text',
		span: 6,
		rules: {
			required: 'name',
		},
	},
	{
		name: 'pincode',
		label: 'pincode',
		placeholder: 'pincode',
		type: 'location-select',
		optionsListKey: 'locations',
		params: { filters: { type: ['pincode'] } },
		multiple: false,
		labelKey: 'postal_code',
		valueKey: 'postal_code',
		span: 6,
		rules: {
			required: 'pincode',
		},
		value: valuesToPrefill?.pincode,
	},
	{
		name: 'country_id',
		label: 'country_id',
		type: 'location-select',
		optionsListKey: 'locations',
		caret: true,
		defaultOptions: true,
		params: { filters: { type: ['country'] } },
		rules: {
			required: 'country_id',
		},
		value: valuesToPrefill?.country_id,
	},
	{
		name: 'address',
		label: 'address',
		placeholder: 'address',
		type: 'text',
		span: 6,
		rules: {
			required: 'address',
		},
	},
	{
		name: 'poc_name',
		label: 'poc_name',
		placeholder: 'poc_name',
		type: 'text',
		span: 6,
		rules: { required: true },
	},
	{
		name: 'phone_number',
		label: 'phone_number',
		placeholder: 'phone_number',
		type: 'mobile-number-select',
		inputType: 'number',
		select2: 'new',
		span: 6,
		rules: {
			required: true,
			validate: (value) => (value?.country_code && value?.number
				? undefined
				: 'phone_number'),
		},
	},
	{
		name: 'poc_email',
		label: 'poc_email',
		placeholder: 'poc_email',
		type: 'text',
		span: 6,
		rules: { required: true },
	},
];

export default getOtherAddressControls;
