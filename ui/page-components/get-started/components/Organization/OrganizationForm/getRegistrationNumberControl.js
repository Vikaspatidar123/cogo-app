const patterns = {
	PAN_NUMBER       : /[A-Za-z]{5}\d{4}[A-Za-z]{1}/g,
	EMAIL            : /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,})+$/,
	CONTAINER_NUMBER : /^[A-Z]{3}U[0-9]{6,7}$/,
	GST_NUMBER       : /\d{2}[A-Za-z]{5}\d{4}[A-Za-z]{1}[A-Za-z\d]{1}[Zz]{1}[A-Za-z\d]{1}/g,
};

const countryRegistrationNumberControlMapping = {
	'IN-PAN': {
		label      : 'PAN',
		lowerlabel : '(*Provide company PAN, if available)',
		maxLength  : 10,
		rules      : {
			required : 'Registraion Number is required',
			pattern  : {
				value   : patterns?.PAN_NUMBER,
				message : 'Registraion Number is invalid',
			},
		},
	},
	'IN-GST': {
		label     : 'GST',
		maxLength : 15,
		rules     : {
			required : 'Registraion Number is required',
			pattern  : {
				value   : patterns?.GST_NUMBER,
				message : 'GST is invalid',
			},
		},
	},
	'VN-ECN': {
		label     : 'ECN',
		maxLength : 14,
		rules     : {
			required : 'Registraion Number is required',
			pattern  : {
				value   : /^[0-3]{1}[0-9]{9}$|^[0-3]{1}[0-9]{9}-?[0-9]{3}$/,
				message : 'ECN is invalid',
			},
		},
	},
	'VN-TAX': {
		label : 'Tax Number',
		rules : {
			required  : 'Registraion Number is required',
			maxLength : 14,
			pattern   : {
				value   : /^[0-3]{1}[0-9]{9}$|^[0-3]{1}[0-9]{9}-?[0-9]{3}$/,
				message : 'Tax Number is invalid',
			},
		},
	},
};

const getRegistrationNumberControl = ({ countryCode = 'IN-PAN' }) => ({
	label       : 'Tax Number',
	lowerlabel  : '',
	name        : 'registration_number',
	className   : 'registration_number',
	placeholder : 'PAN Number',
	type        : 'text',
	maxLength   : undefined,
	span        : 12,
	...(countryRegistrationNumberControlMapping[countryCode] || {}),
});

export default getRegistrationNumberControl;
