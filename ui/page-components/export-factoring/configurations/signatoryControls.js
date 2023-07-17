import patterns from '@/ui/commons/configurations/patterns';

const SIGNATORY_CONTROLS = [
	{
		name        : 'signatory',
		placeholder : 'Select Signatory',
		type        : 'select',
		show        : true,
		rules       : {
			required: true,
		},
	},
	{
		name        : 'signatory_mobile_number',
		placeholder : 'Phone Number',
		type        : 'mobile_number',
		rules       : {
			required: true,
		},
	},
	{
		name        : 'signatory_email',
		placeholder : 'Email',
		type        : 'text',
		rules       : {
			required : true,
			pattern  : {
				value   : patterns.EMAIL,
				message : 'Enter Valid email',
			},
		},
	},
];

export const getSignControls = ({
	getOptionsForSignatories = () => { },
	watch = () => { },
	setSelectedSignatory = () => { },
	directors = {},
}) => SIGNATORY_CONTROLS.map((control) => {
	if (control.name === 'signatory') {
		return {
			...control,
			options      : getOptionsForSignatories(directors),
			handleChange : (e) => setSelectedSignatory(e),
		};
	}
	if (['signatory_mobile_number', 'signatory_email'].includes(control.name)) {
		return {
			...control,
			options : getOptionsForSignatories(directors),
			show    : !!watch('signatory'),
		};
	}
	return control;
});
