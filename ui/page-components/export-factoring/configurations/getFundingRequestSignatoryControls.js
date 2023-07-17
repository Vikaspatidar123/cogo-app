import data from '@/.data-store/constants/countries.json';
import patterns from '@/ui/commons/configurations/patterns';

const country_code = data?.map((x) => ({
	label : x.mobile_country_code,
	value : x.mobile_country_code,
}));

const controls = [
	{
		name        : 'name',
		label       : 'Name',
		placeholder : 'Enter Name',
		type        : 'text',
		span        : 6,
	},
	{
		name        : 'designation',
		label       : 'Designation',
		placeholder : 'Enter Designation',
		span        : 6,
		type        : 'select',
		options     : [
			{
				label : 'Owner',
				value : 'owner',
			},
			{
				label : 'Financial Head',
				value : 'financial_head',
			},
			{
				label : 'Logistics Head',
				value : 'logistics_head',
			},
			{
				label : 'Expo Head',
				value : 'expo_head',
			},
			{
				label : 'Ops Head',
				value : 'ops_head',
			},
			{
				label : 'Proprietorship',
				value : 'proprietorship',
			},
			{
				label : 'Director',
				value : 'director',
			},
			{
				label : 'Partner',
				value : 'partner',
			},
			{
				label : 'MD',
				value : 'md',
			},
			{
				label : 'CEO',
				value : 'ceo',
			},
			{
				label : 'CFO',
				value : 'cfo',
			},
			{
				label : 'Other',
				value : 'other',
			},
		],
		rules: {
			required: true,
		},
	},
	{
		name        : 'email',
		label       : 'Email',
		placeholder : 'Enter Email Id',
		type        : 'email',
		// value       : email,
		// disabled    : email,
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
		placeholder : 'Mobile Number',
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
	{
		name       : 'signedLetter',
		drag       : true,
		uploadType : 'aws',
		accept     : '.pdf',
		maxSize    : '5242880',
		rules      : { required: true },
	},
];

export const getFundingRequestSignatoryControls = () => controls.map((control) => ({ ...control }));
