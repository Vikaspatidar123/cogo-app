import { IcMUpload } from '@cogoport/icons-react';

const getBillingAddressControls = ({ valuesToPrefill }) => [
	{
		name: 'name',
		label: 'name',
		placeholder: 'name',
		type: 'text',
		span: 6,
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
		rules: { required: 'Required' },
		value: valuesToPrefill?.pincode,
	},
	{
		name: 'tax_number',
		label: 'tax_number',
		placeholder: 'tax_number',
		type: 'text',
		span: 6,
		rules: {
			required: true,
			pattern: {
				value: geo.regex.GST,
				message: 'translationKey',
			},
		},
	},
	{
		name: 'tax_number_document_url',
		label: 'tax_number_document_url',
		type: 'file',
		drag: true,
		span: 6,
		accept:
			'image/*,.pdf,.doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document',
		uploadType: 'aws',
		format: ' ',
		uploadIcon: () => <IcMUpload size={2} />,
		rules: {
			required: 'tax_number_document_url',
		},
	},
	{
		name: 'is_sez',
		label: 'is_sez',
		type: 'checkbox',
		options: [
			{
				label: 'is_sez',
				value: true,
			},
		],
		span: 6,
	},
	{
		name: 'sez_proof',
		label: 'sez_proof',
		type: 'file',
		drag: true,
		span: 6,
		accept:
			'image/*,.pdf,.doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document',
		uploadType: 'aws',
		uploadIcon: () => <IcMUpload size={2} />,
		format: ' ',
		rules: {
			required: 'sez_proof',
		},
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

export default getBillingAddressControls;
