export const controls = (countryCode, isOpen, setIsOpen, rest) => (
	[
		{
			name        : 'registration_number',
			label       : countryCode === 'IN' ? 'Company’s PAN Number' : 'Company’s Registration Number',
			type        : 'text',
			span       	: 6,
			value       : rest?.registration_number,
			validations : [{ type: 'required', message: countryCode === 'IN' ? 'Pan number is Required' : 'Registration Number is Required' }],
			placeholder : 'PAN for India',
		},
		{
			name            : 'utility_bill_document_url',
			label           : 'Company\'s Address Proof',
			type            : 'file',
			span           	: 6,
			drag            : true,
			uploadType      : 'aws',
			multiple        : false,
			uploadIcon      : 'ic-upload',
			themeType       : 'black',
			onlyURLOnChange : true,
			value           : rest?.utility_bill_document_url,
			validations     : [{ type: 'required', message: countryCode === 'IN' ? 'Address Proof is Required' : 'Registration Extract is Required' }],
		},
		{
			name        : 'mobile',
			showLabel   : false,
			type        : 'text',
			span        : 6,
			value       : rest?.mobile?.mobile_number,
			label       : 'Mobile Number',
			placeholder	: '9876543210',
			validations : [
				{
					type    : 'required',
					message : 'mobile number is required',
				},
			],
		},
	]
);
