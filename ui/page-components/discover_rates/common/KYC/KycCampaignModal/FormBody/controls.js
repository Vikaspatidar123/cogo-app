export const controls = (countryCode, isOpen, setIsOpen, rest) => (
	[
		{
			name        : 'registration_number',
			// label       : countryCode === 'IN' ? 'Company’s PAN Number' : 'Company’s Registration Number',
			label       : 'Registration No. (PAN for India)',
			type        : 'text',
			span       	: 12,
			value       : rest?.registration_number,
			validations : [{ type: 'required', message: countryCode === 'IN' ? 'Pan number is Required' : 'Registration Number is Required' }],
			placeholder : 'PAN',
		},
		{
			name            : 'utility_bill_document_url',
			label           : 'Company\'s Address Proof',
			type            : 'file',
			span           	: 12,
			drag            : true,
			uploadType      : 'aws',
			multiple        : false,
			uploadIcon      : 'ic-upload',
			themeType       : 'black',
			onlyURLOnChange : true,
			value           : rest?.utility_bill_document_url,
			validations     : [{ type: 'required', message: countryCode === 'IN' ? 'Address is Required' : 'Registration Extract is Required' }],
		},
		{
			name        : 'mobile',
			showLabel   : false,
			type        : 'mobile-number-select',
			codeKey     : 'mobile_country_code',
			numberKey   : 'mobile_number',
			span        : 12,
			caret       : true,
			value       : rest?.mobile,
			label       : 'Mobile Number',
			placeholder	: '9876543210',
			validations : [
				{
					type      : 'required',
					message   : 'mobile number is required',
					inputType : 'group',
				},
			],
		},
	]
);
