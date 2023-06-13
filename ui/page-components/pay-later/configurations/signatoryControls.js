const SIGNATORYCONTROLS = [
	{
		name        : 'signatory',
		placeholder : 'Select Signatory',
		type        : 'select',
		show        : true,
	},
	{
		name        : 'signatory_mobile_number',
		placeholder : 'Phone Number',
		type        : 'mobile_number',
	},
	{
		name        : 'signatory_email',
		placeholder : 'Email',
		type        : 'text',
	},
];

export const getControls = ({
	getOptionsForSignatories = () => {},
	watch = () => {},
}) => SIGNATORYCONTROLS.map((control) => {
	if (control.name === 'signatory') {
		return {
			...control,
			options: getOptionsForSignatories(),
		};
	}
	if (['signatory_mobile_number', 'signatory_email'].includes(control.name)) {
		return {
			...control,
			options : getOptionsForSignatories(),
			show    : !!watch('signatory'),
		};
	}
	return control;
});
