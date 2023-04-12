import patterns from '@/ui/commons/configurations/patterns';

const company_controls = (roleCheck) => [
	{
		name        : 'country',
		label       : 'Country of Registration',
		type        : 'select',
		span        : 6,
		optionKey   : 'countries',
		placeholder : 'Enter or Select Country',
		rules       : {
			required: { value: true, message: 'Country of Registration is required' },
		},
	},
	{
		name        : 'company_name',
		label       : 'Company Name',
		type        : 'text',
		span        : 6,
		placeholder : 'Enter Company Name',
		className   : 'primary md',
		rules       : {
			required: { value: true, message: 'Company Name is required' },
		},
	},
	{
		name: 'registration_number',
		label:
			roleCheck === 'collection_party' || roleCheck === 'paying_party'
				? 'PAN Number'
				: 'PAN Number (optional)',
		type        : 'text',
		span        : 6,
		placeholder : 'Enter Registration Number',
		className   : 'primary md',
		rules       : {
			required: !!(
				roleCheck === 'collection_party' || roleCheck === 'paying_party'
			),
			pattern: {
				value   : patterns.PAN_NUMBER,
				message : 'Pan Number is invalid',
			},
		},
	},
	{
		name      : 'not_reg_under_gst',
		label     : 'Not registered under GST',
		type      : 'checkbox',
		span      : 12,
		className : 'primary md',
		value     : 'true',
	},
	{
		name        : 'tax_number',
		label       : 'GST Number',
		type        : 'text',
		placeholder : 'Enter GST Number',
		showLabel   : false,
		span        : 6,
		className   : 'primary md',
		disabled    : false,
		rules       : {
			pattern: {
				value   : patterns.GST_NUMBER,
				message : 'GST Number is invalid',
			},
			required: { value: true, message: 'GST Number is required' },
		},
	},
	{
		name            : 'tax_number_document_url',
		label           : 'GST Proof',
		type            : 'file',
		drag            : true,
		onlyURLOnChange : true,
		span            : 12,
		height          : 50,
		className       : 'primary md',
		accept:
			'image/*,.pdf,.doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document',
		uploadType : 'aws',
		disabled   : false,
		rules      : { required: { value: true, message: 'GST Proof is required' } },
	},
	{
		type   : 'textarea',
		name   : 'address',
		label  : 'Address',
		rules  : { required: { value: true, message: 'Address is required' } },
		span   : 6,
		height : 25,
		style  : {
			resize: 'vertical',
		},
	},
	{
		name        : 'pincode',
		type        : 'async_select',
		asyncKey    : 'locations',
		params      : { filters: { type: ['pincode'] } },
		label       : 'Pincode / Zip Code',
		labelKey    : 'postal_code',
		valueKey    : 'postal_code',
		span        : 6,
		placeholder : 'Enter pincode',
		rules       : { required: { value: true, message: 'Pincode is required' } },
	},
];

export default company_controls;
