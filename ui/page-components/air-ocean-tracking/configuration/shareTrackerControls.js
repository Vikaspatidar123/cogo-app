import patterns from '@/ui/commons/configurations/patterns';

const shareTrackerControls = [
	{
		name        : 'name',
		label       : 'Name',
		type        : 'text',
		size        : 'sm',
		placeholder : 'Enter Name',
		rules       : { required: 'Please enter name' },
	},
	{
		name        : 'email',
		label       : 'Email Address',
		type        : 'text',
		size        : 'sm',
		placeholder : 'Enter Email',
		rules       : {
			required : 'Please enter email',
			pattern  : {
				value   : patterns.EMAIL,
				message : 'Invalid email address',
			},
		},
	},
];

export default shareTrackerControls;
