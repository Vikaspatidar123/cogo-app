import patterns from '@/commons/configurations/patterns';

const controls = [
	{
		name: 'email',
		label: 'Email',
		type: 'email',
		size: 'lg',
		span: 12,
		value: '',
		rules: {
			required: true,
			pattern: {
				value: patterns.EMAIL,
				message: 'Email is invalid',
			},
		},
	},
	{
		name: 'password',
		label: 'Password',
		type: 'password',
		size: 'lg',
		span: 12,
		value: '',
		rules: {
			required: true,
		},
	},
];

export const getControls = (emailRef) => controls.map((control) => {
	const newControl = { ...control };

	const { name } = newControl;

	if (name === 'email') {
		newControl.inputRef = emailRef;
	}

	return {
		...newControl,
	};
});
