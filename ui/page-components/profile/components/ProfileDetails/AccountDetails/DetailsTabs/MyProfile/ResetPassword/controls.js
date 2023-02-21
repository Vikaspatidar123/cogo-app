import patterns from '@/ui/commons/configurations/patterns';

const getControls = () => [
	{
		label : 'Password',
		name  : 'password',
		type  : 'text',
		span  : 12,
		rules : {
			required : true,
			pattern  : {
				value   : patterns.PASSWORD.PASSWORD_PATTERN,
				message : 'password is invalid',
			},
		},
	},
	{
		name  : 'confirmPassword',
		label : 'Confirm Password',
		type  : 'text',
		span  : 12,
		rules : {
			required: true,
		},
	},
];

export default getControls;
