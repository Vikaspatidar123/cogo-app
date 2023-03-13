/* eslint-disable max-len */
// eslint-disable-next-line import/no-unresolved
import data from '@/.data-store/constants/countries.json';

const country_code = data?.map((x) => ({ label: x.mobile_country_code, value: x.mobile_country_code }));
const fields = [
	{
		name        : 'name',
		label       : 'Billing Party Name',
		placeholder : 'Enter Name',
		type        : 'text',
		style       : { width: '370px' },
	},
	{
		name           : 'pincode',
		label          : 'Pincode',
		placeholder    : 'Select Pincode',
		type           : 'select',
		optionsListKey : 'locations',
		params         : { filters: { type: ['pincode'] } },
		multiple       : false,
		labelKey       : 'postal_code',
		valueKey       : 'postal_code',
		style          : { width: '370px' },
		rules          : { required: 'Required' },
	},
	{
		name        : 'tax_number',
		label       : 'GST Number',
		placeholder : 'Enter GST Number',
		type        : 'text',
		style       : { width: '370px' },
		rules       : {
			required : true,
			pattern  : {
				// value: geo.regex.GST,
				message: 'translationKey',
			},
		},
	},

	{
		name    : 'is_sez',
		label   : 'Is your address SEZ?',
		type    : 'checkbox',
		options : [
			{
				label : 'is_sez',
				value : true,
			},
		],
		style: { width: '370px' },
	},

	{
		name        : 'address',
		label       : 'Address',
		placeholder : 'Enter Address',
		type        : 'text',
		style       : { width: '370px' },
		rules       : {
			required: 'address',
		},
	},
	{
		name        : 'poc_name',
		label       : 'POC Name',
		placeholder : 'Enter POC Name',
		type        : 'text',
		style       : { width: '370px' },
		rules       : { required: true },
	},
	{
		name        : 'phone_number',
		label       : 'POC Mobile Number',
		placeholder : 'Enter Mobile Number',
		type        : 'mobile_number',
		inputType   : 'number',
		select2     : 'new',
		style       : { width: '245px' },
		options     : country_code,
		rules       : {
			required : true,
			validate : (value) => (value?.country_code && value?.number
				? undefined
				: 'phone_number'),
		},
	},
	{
		name        : 'poc_email',
		label       : 'POC Email		',
		placeholder : 'Enter POC Email',
		type        : 'text',
		style       : { width: '370px' },
		rules       : { required: true },
	},
	{
		name  : 'sez_proof',
		label : 'Sez Proof',
		type  : 'file',
		drag  : true,
		style : { width: '370px' },
		accept:
			'image/*,.pdf,.doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document',
		rules: {
			required: 'sez_proof',
		},
	},
	{
		name  : 'tax_number_document_url',
		label : 'GST Proof',
		type  : 'file',
		style : { width: '370px' },
		accept:
			'image/*,.pdf,.doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document',
		rules: {
			required: 'tax_number_document_url',
		},
	},
];

const getOtherAddressControls = ({
	cityPincode = {},
}) => fields.map((control) => {
	const { name } = control;
	let newControl = { ...control };

	if (name === 'pincode') {
		newControl = { ...newControl, ...cityPincode };
	}
	return { ...newControl };
});

export default getOtherAddressControls;
