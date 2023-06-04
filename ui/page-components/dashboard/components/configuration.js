import { isEmpty } from '@cogoport/utils';

const validateMobileNumber = ({ value = {}, numberKey = '', label = '' }) => {
	if (isEmpty(value) || !(numberKey in value)) {
		return undefined;
	}

	const { [numberKey]: mobileNumber = '' } = value;

	if (mobileNumber?.length === 0) {
		return `${label} is Required`;
	}

	if (mobileNumber?.[0] === '0') {
		return `Invalid ${label} `;
	}

	return undefined;
};
export const getControls = (initialValues) => [
	{
		name        : 'name',
		type        : 'text',
		placeholder : 'PAN',
		label       : 'Registration No. (PAN for India)',
		value       : initialValues?.registration_number,
		rules       : {
			required:
			initialValues?.country_code === 'IN'
				? 'Pan number is Required'
				: 'Registration Number is Required',
		},
	},
	{
		name        : 'upload',
		type        : 'file',
		placeholder : 'Upload here...',
		label       : "Company's Address Proof",
		value       : initialValues?.utility_bill_document_url,
		rules       : {
			required:
			initialValues?.country_code === 'IN'
				? 'Address is Required'
				: 'Registration Extract is Required',
		},
	},
	{
		name        : 'mobile',
		type        : 'mobile_number',
		placeholder : 'Upload here...',
		label       : 'Mobile Number',
		value       : initialValues?.mobile,
		rules       : {
			required : true,
			validate : (value) => validateMobileNumber({
				value,
				numberKey : 'mobile_number',
				label     : 'Mobile Number',
			}),
		},
	},
];
