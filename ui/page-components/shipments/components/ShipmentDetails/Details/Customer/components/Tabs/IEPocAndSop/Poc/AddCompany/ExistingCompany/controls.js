import { poc_options } from '../options';

import patterns from '@/ui/commons/configurations/patterns';
import getGeoConstants from '@/ui/commons/constants/geo';

const existing_company_controls = (roleCheck, compType) => {
	const geo = getGeoConstants();
	const IDENTIFICAITON_LABEL = geo.others.identification_number.label;

	return [
		{
			name        : 'business_name',
			label       : 'Company Name',
			type        : compType === 'booking_party' ? 'text' : 'select',
			span        : 5.8,
			placeholder : 'Enter Company Name',
			disabled    : compType === 'booking_party',
			className   : 'primary md',
			rules       : {
				required: { value: true, message: 'Company Name is required' },
			},
		},
		{
			name  : 'registration_number',
			label : ['collection_party', 'paying_party'].includes(roleCheck)
				? `${IDENTIFICAITON_LABEL}` : `${IDENTIFICAITON_LABEL} (optional)`,
			type        : 'text',
			span        : 5.8,
			placeholder : 'Enter Registration Number',
			disabled    : true,
			rules       : {
				required: {
					value   : ['collection_party', 'paying_party'].includes(roleCheck),
					message : `${IDENTIFICAITON_LABEL} is required`,
				},
			},
		},
		{
			type    : 'select',
			name    : 'address',
			span    : 5.8,
			label   : 'Address',
			options : [],
			rules   : {
				required: {
					value   : true,
					message : 'Address is required',
				},
			},
			height : 25,
			style  : {
				resize: 'vertical',
			},
		},
		{
			name  : 'pincode',
			type  : 'text',
			span  : 5.8,
			label : 'Pincode / Zip Code',
			rules : {
				required: {
					value   : true,
					message : 'Pincode / Zip Code is required',
				},
			},
			placeholder: 'Enter pincode',
		},
		{
			name        : 'name',
			label       : 'POC Name',
			type        : 'select',
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
			span           : 5.8,
		},
		{
			name        : 'email',
			label       : 'Email Address',
			type        : 'email',
			className   : 'primary md',
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
	];
};

export default existing_company_controls;
