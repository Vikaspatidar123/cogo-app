import { poc_options } from './options';

import patterns from '@/ui/commons/configurations/patterns';

const company_controls = (roleCheck) => [
	{
		name           : 'country_id',
		label          : 'Country of Registration',
		type           : 'select',
		span           : 6,
		optionsListKey : 'countries',
		placeholder    : 'Enter or Select Country',
		className      : 'primary md',
		rules          : {
			required: { value: true, message: 'Country of Registration is required' },
		},
	},
	{
		name  : 'registration_number',
		label : ['collection_party', 'paying_party'].includes(roleCheck)
			? 'PAN Number / Registration Number'
			: 'PAN Number / Registration Number (optional)',
		type        : 'text',
		span        : 6,
		placeholder : 'Enter Registration Number',
		className   : 'primary md',
		rules       : {
			required: {
				value   : ['collection_party', 'paying_party'].includes(roleCheck),
				message : 'PAN Number / Registration Number is required',
			},
			// pattern: {
			// 	value: patterns.PAN_NUMBER,
			// 	message: 'PAN Number / Registration Number is invalid',
			// },
		},
	},
	{
		type    : 'creatable-select',
		name    : 'address',
		label   : 'Address',
		options : [],
		rules   : { required: { value: true, message: 'Address is required' } },
		span    : 12,
		height  : 25,
		style   : {
			resize: 'vertical',
		},
	},
	{
		name        : 'business_name',
		label       : 'Company Name',
		type        : 'text',
		span        : 12,
		placeholder : 'Enter Company Name',
		className   : 'primary md',
		rules       : {
			required: { value: true, message: 'Company Name is required' },
		},
	},
	{
		name        : 'pincode',
		label       : 'Pincode / Zip Code',
		type        : 'text',
		rules       : { required: { value: true, message: 'Pincode is required' } },
		span        : 6,
		placeholder : 'Enter Pincode / Zip Code',
		className   : 'primary md',
	},
	{
		name        : 'name',
		label       : 'POC Name',
		type        : 'creatable-select',
		className   : 'primary md',
		span        : 6,
		placeholder : 'Enter your POC Name',
	},
	{
		type           : 'select',
		options        : poc_options,
		caret          : true,
		multiple       : true,
		name           : 'work_scopes',
		label          : 'Workscopes',
		showOriginIcon : true,
		placeholder    : 'Choose workscope Type',
		className      : 'primary md',
		span           : 6,
	},
	{
		name        : 'email',
		label       : 'Email Address',
		type        : 'email',
		className   : 'primary md',
		span        : 6,
		placeholder : 'Enter Email Address',
		rules       : {
			pattern: {
				value   : patterns.EMAIL,
				message : 'Enter valid email',
			},
		},
	},
	{
		name        : 'mobile_number',
		label       : 'Mobile Number',
		type        : 'mobile-number-select',
		className   : 'primary md',
		span        : 6,
		placeholder : 'Enter your POC mobile',
		select2     : 'new small',
	},
	{
		name        : 'alternate_mobile_number',
		label       : 'Alternate Mobile Number (optional)',
		type        : 'mobile-number-select',
		className   : 'primary md',
		span        : 6,
		placeholder : 'Enter your Alternate POC mobile',
		select2     : 'new small',
	},
	{
		name      : 'not_reg_under_gst',
		label     : ' ',
		type      : 'checkbox',
		span      : 12,
		className : 'primary md',
		options   : [
			{
				label : 'Not registered under GST',
				value : 'true',
			},
		],
	},
	{
		name        : 'tax_number',
		label       : 'GST Number',
		type        : 'text',
		placeholder : 'Enter GST Number',
		showLabel   : false,
		span        : 6,
		height      : 40,
		className   : 'primary md',
		disabled    : false,
		rules       : {
			// pattern: {
			// 	value: patterns.GST_NUMBER,
			// 	message: 'GST Number is invalid',
			// },
			required: { value: true, message: 'GST Number is required' },
		},
	},
	{
		name            : 'tax_number_document_url',
		label           : 'GST Proof',
		type            : 'file',
		drag            : true,
		onlyURLOnChange : true,
		uploadIcon      : 'ic-upload',
		span            : 6,
		height          : 50,
		className       : 'primary md',
		accept:
			'image/*,.pdf,.doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document',
		uploadType : 'aws',
		disabled   : false,
		rules      : { required: { value: true, message: 'GST Proof is required' } },
	},
];

export default company_controls;
