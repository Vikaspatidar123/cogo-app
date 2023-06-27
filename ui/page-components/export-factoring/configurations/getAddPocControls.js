import data from '@/.data-store/constants/countries.json';
import patterns from '@/ui/commons/configurations/patterns';

const country_code = data?.map((x) => ({
	label : x.mobile_country_code,
	value : x.mobile_country_code,
}));

const controls = [
	{
		name        : 'name',
		type        : 'text',
		placeholder : 'Name',
		label       : 'Name',
		span        : 6,
		rules       : { required: 'Name is required' },
	},
	{
		name        : 'designation',
		type        : 'text',
		placeholder : 'Designation',
		label       : 'Designation',
		span        : 6,
		rules       : { required: 'Designation is required' },
	},
	{
		name        : 'email_id',
		label       : 'Email',
		placeholder : 'Email',
		type        : 'email',
		span        : 6,
		rules       : {
			required : true,
			pattern  : {
				value   : patterns.EMAIL,
				message : 'Email is invalid',
			},
		},
	},
	{
		name        : 'mobile_number',
		label       : 'Mobile Number',
		placeholder : 'Enter Mobile Number',
		type        : 'mobile_number',
		inputType   : 'number',
		select2     : 'new',
		style       : { width: '210px' },
		options     : country_code,
		rules       : {
			required : true,
			validate : (value) => (value?.country_code && value?.number ? undefined : 'Phone Number'),
		},
	},
];

export const getAddPocControls = () => controls.map((control) => ({ ...control }));
