const get = (formObject, key) => formObject[key];

const patterns = {
	PAN_NUMBER : /[A-Za-z]{5}\d{4}[A-Za-z]{1}/g,
	EMAIL      : /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,})+$/,

};
const pinCodeValidator = /^([0-9]{6})$/;
const phoneNumberValidator = /^([0-9]{10})$/;

const controls = [
	{
		name        : 'insuredFirstName',
		placeholder : 'Insured First Name',
		type        : 'text',
		span        : 4,
		profileKey  : 'name',
	},
	{
		name        : 'insuredLastName',
		placeholder : 'Insured Last Name',
		type        : 'text',
		span        : 4,
	},
	{
		name        : 'email',
		placeholder : 'Email',
		type        : 'text',
		span        : 4,
		rules       : {
			pattern: {
				value   : patterns.EMAIL,
				message : 'Invalid email',
			},
		},
		profileKey: 'email',
	},
	{
		name        : 'phoneNo',
		placeholder : 'Phone Number',
		type        : 'text',
		span        : 4,
		rules       : {
			pattern: {
				value   : phoneNumberValidator,
				message : 'Invalid phone number',
			},
			length: {
				value   : 10,
				message : 'Phone Number should be of 10 digits',
			},
		},
		profileKey: 'mobile_number',
	},
	{
		name        : 'gstin',
		placeholder : 'GST No.',
		type        : 'text',
		span        : 4,
		rules       : {
			pattern: {
				value   : patterns.GST_NUMBER,
				message : 'Invalid GST Number',
			},
		},
	},
	{
		name        : 'aadharNumber',
		placeholder : 'Aadhar No.',
		type        : 'number',
		span        : 4,
		rules       : {
			pattern: {
				value   : /^[1-9]{1}[0-9]{11}$/g,
				message : 'Invalid Aadhar Number',
			},
		},
	},
	{
		name        : 'partyName',
		placeholder : 'Billing Name',
		type        : 'text',
		span        : 4,
		rules       : {},
	},
	{
		name        : 'billingAddress',
		placeholder : 'Address',
		type        : 'text',
		span        : 4,
		rules       : {},
	},
	{
		name        : 'billingPincode',
		placeholder : 'Pincode',
		type        : 'text',
		span        : 4,
		rules       : {
			pattern: {
				value   : pinCodeValidator,
				message : 'Invalid pincode ',
			},
		},
	},
	{
		name        : 'billingState',
		placeholder : 'State',
		type        : 'text',
		span        : 4,
		disabled    : true,
	},

	{
		name        : 'billingCity',
		placeholder : 'City',
		type        : 'text',
		disabled    : true,
		span        : 4,
	},
	{
		name        : 'panNumber',
		placeholder : 'PAN Number',
		type        : 'text',
		span        : 4,
		rules       : {
			pattern: {
				value   : /^[A-Z]{5}[0-9]{4}[A-Z]{1}/g,
				message : 'Invalid PAN Number',
			},
		},
	},
];

const getControls = (formDetails = {}, profile = {}, uploadType = '') => controls.map((control) => {
	const names = profile?.name?.split(' ');
	if (control.name === 'insuredFirstName') {
		return {
			...control,
			value: get(formDetails, control.name) || names?.[0],
		};
	}
	if (control.name === 'insuredLastName') {
		return {
			...control,
			value: get(formDetails, control.name) || names?.[1],
		};
	}
	if (control.name === 'aadharNumber') {
		return {
			...control,
			placeholder : uploadType === 'CORPORATE' ? 'Aadhar No (optional)' : 'Aadhar No',
			value       : get(formDetails, control.name),
		};
	}
	if (control.name === 'gstin') {
		return {
			...control,
			placeholder : uploadType === 'INDIVIDUAL' ? 'GST Number (optional)' : 'GST Number',
			value       : get(formDetails, control.name),
		};
	}
	return {
		...control,
		value: get(formDetails, control.name) || profile[control?.profileKey],
	};
});

export default getControls;
