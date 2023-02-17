import { IcMUpload } from '@cogoport/icons-react';

const fields = [
	{
		name: 'name',
		label: 'Billing Party Name',
		placeholder: 'Enter Name',
		type: 'text',
		style: { width: '340px' },
	},
	{
		name: 'pincode',
		label: 'Pincode',
		placeholder: 'Select Pincode',
		type: 'select',
		optionsListKey: 'locations',
		params: { filters: { type: ['pincode'] } },
		multiple: false,
		labelKey: 'postal_code',
		valueKey: 'postal_code',
		style: { width: '340px' },
		rules: { required: 'Required' },
	},
	{
		name: 'tax_number',
		label: 'GST Number',
		placeholder: 'Enter GST Number',
		type: 'text',
		style: { width: '340px' },
		rules: {
			required: true,
			pattern: {
				// value: geo.regex.GST,
				message: 'translationKey',
			},
		},
	},

	{
		name: 'is_sez',
		label: 'Is your address SEZ?',
		type: 'checkbox',
		options: [
			{
				label: 'is_sez',
				value: true,
			},
		],
		style: { width: '340px' },
	},

	{
		name: 'address',
		label: 'Address',
		placeholder: 'Enter Address',
		type: 'text',
		style: { width: '340px' },
		rules: {
			required: 'address',
		},
	},
	{
		name: 'poc_name',
		label: 'POC Name',
		placeholder: 'Enter POC Name',
		type: 'text',
		style: { width: '340px' },
		rules: { required: true },
	},
	{
		name: 'phone_number',
		label: 'POC Mobile Number',
		placeholder: 'Enter Mobile Number',
		type: 'select',
		inputType: 'number',
		select2: 'new',
		style: { width: '340px' },
		rules: {
			required: true,
			validate: (value) => (value?.country_code && value?.number
				? undefined
				: 'phone_number'),
		},
	},
	{
		name: 'poc_email',
		label: 'POC Email		',
		placeholder: 'Enter POC Email',
		type: 'text',
		style: { width: '340px' },
		rules: { required: true },
	},
	{
		name: 'sez_proof',
		label: 'Sez Proof',
		type: 'file',
		drag: true,
		style: { width: '340px' },
		accept:
			'image/*,.pdf,.doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document',
		rules: {
			required: 'sez_proof',
		},
	},
	{
		name: 'tax_number_document_url',
		label: 'GST Proof',
		type: 'file',
		style: { width: '340px' },
		accept:
			'image/*,.pdf,.doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document',
		rules: {
			required: 'tax_number_document_url',
		},
	},
];

const getBillingAddressControls = ({
	cityPincode = {},
}) => fields.map((control) => {
	const { name } = control;
	let newControl = { ...control };

	if (name === 'pincode') {
		newControl = { ...newControl, ...cityPincode };
	}
	return { ...newControl };
});

export default getBillingAddressControls;
