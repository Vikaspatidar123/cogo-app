const controls = [
	{
		type: 'mobile-number-select',
		name: 'mobile',
		codeKey: 'mobileCountryCode',
		numberKey: 'mobileNumber',
		label: 'Mobile Number',
		inputType: 'number',
		span: 12,
		rules: {
			required: true,
			validate: (value) => {
				const { mobileCountryCode, mobileNumber } = value;

				if (!(mobileCountryCode || mobileNumber) || !mobileNumber) {
					return 'Mobile Number is required';
				}

				if (!mobileCountryCode) {
					return 'Mobile Number Country Code is Required';
				}

				return undefined;
			},
		},
	},
];

export const getControls = (mobileSelectRef) => controls.map((control) => {
	const newControl = { ...control };

	const { name } = newControl;

	if (name === 'mobile') {
		newControl.mobileSelectRef = mobileSelectRef;
	}

	return {
		...newControl,
	};
});
