import { poc_options } from './options';

import patterns from '@/ui/commons/configurations/patterns';
import getGeoConstants from '@/ui/commons/constants/geo';

const PARTIES = ['collection_party', 'paying_party'];

const company_controls = (roleCheck) => {
	const geo = getGeoConstants();
	const IDENTIFICAITON_LABEL = geo.others.identification_number.label;
	const REGISTRATION_LABEL = geo.others.registration_number.label;

	return [
		{
			name        : 'country_id',
			label       : 'Country of Registration',
			type        : 'select',
			span        : 5.8,
			optionKey   : 'countries',
			placeholder : 'Enter or Select Country',
			rules       : {
				required: { value: true, message: 'Country of Registration is required' },
			},
		},
		{
			name  : 'registration_number',
			label : PARTIES.includes(roleCheck)
				? IDENTIFICAITON_LABEL : `${IDENTIFICAITON_LABEL} (optional)`,
			type        : 'text',
			span        : 5.8,
			placeholder : `Enter ${IDENTIFICAITON_LABEL}`,
			rules       : {
				required: {
					value   : PARTIES.includes(roleCheck),
					message : `${IDENTIFICAITON_LABEL} is required`,
				},
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
			rules       : {
				required: { value: true, message: 'Company Name is required' },
			},
		},
		{
			name        : 'pincode',
			label       : 'Pincode / Zip Code',
			type        : 'text',
			rules       : { required: { value: true, message: 'Pincode is required' } },
			span        : 5.8,
			placeholder : 'Enter Pincode / Zip Code',
			className   : 'primary md',
		},
		{
			name        : 'name',
			label       : 'POC Name',
			type        : 'creatable-select',
			span        : 5.8,
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
			span           : 5.8,
		},
		{
			name        : 'email',
			label       : 'Email Address',
			type        : 'email',
			span        : 5.8,
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
			type        : 'mobile_number',
			span        : 5.8,
			placeholder : 'Enter your POC mobile',
			select2     : 'new small',
		},
		{
			name        : 'alternate_mobile_number',
			label       : 'Alternate Mobile Number (optional)',
			type        : 'mobile_number',
			span        : 5.8,
			placeholder : 'Enter your Alternate POC mobile',
			select2     : 'new small',
		},
		{
			name    : 'not_reg_under_gst',
			label   : ' ',
			type    : 'checkbox',
			span    : 12,
			options : [
				{
					label : `Not registered under ${REGISTRATION_LABEL}`,
					value : 'true',
				},
			],
		},
		{
			name        : 'tax_number',
			label       : `${REGISTRATION_LABEL} Number`,
			type        : 'text',
			placeholder : `Enter ${REGISTRATION_LABEL} Number`,
			showLabel   : false,
			span        : 5.8,
			height      : 40,
			disabled    : false,
			rules       : {
				required: {
					value   : true,
					message : `${REGISTRATION_LABEL} Number is required`,
				},
			},
		},
		{
			name            : 'tax_number_document_url',
			label           : `${REGISTRATION_LABEL} Proof`,
			type            : 'file',
			drag            : true,
			onlyURLOnChange : true,
			span            : 5.8,
			height          : 50,
			accept:
				'image/*,.pdf,.doc,.docx,application/msword,'
				+ 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
			disabled : false,
			rules    : {
				required: {
					value   : true,
					message : `${REGISTRATION_LABEL} Proof is required`,
				},
			},
		},
	];
};

export default company_controls;
