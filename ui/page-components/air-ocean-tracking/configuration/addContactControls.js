import { IcMEmail, IcMUserAllocations } from '@cogoport/icons-react';

import patterns from '@/ui/commons/configurations/patterns';

const addContactControls = [
	{
		name        : 'name',
		type        : 'text',
		label       : 'Name *',
		placeholder : 'Enter Name',
		prefix      : <IcMUserAllocations />,
		rules       : {
			required  : 'Please enter name',
			maxLength : { value: 16, message: 'Name length should be less than 16' },
		},
	},
	{
		name        : 'email',
		label       : 'Email *',
		type        : 'text',
		placeholder : 'Enter Email Address',
		prefix      : <IcMEmail />,
		rules       : {
			required : 'Please enter email',
			pattern  : {
				value   : patterns.EMAIL,
				message : 'Invalid email address',
			},
		},
	},
	{
		name            : 'mobile_no',
		label           : 'Mobile No *',
		type            : 'mobile_number',
		isInputGroup    : true,
		showCountryName : false,
		placeholder     : 'Enter Mobile No',
		rules           : {
			required : 'Please enter mobile no',
			pattern  : {
				value   : patterns.MOBILE,
				message : 'Invalid mobile number',
			},
		},
	},
	{
		name        : 'company',
		label       : 'Company',
		type        : 'text',
		placeholder : 'Enter Company Name',

	},
];

export default addContactControls;
