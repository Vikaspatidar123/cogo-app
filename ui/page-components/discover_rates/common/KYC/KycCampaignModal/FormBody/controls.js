export const controls = (countryCode, rest) => (
	[
		{
			name  : 'registration_number',
			// label       : countryCode === 'IN' ? 'Company’s PAN Number' : 'Company’s Registration Number',
			label : 'Registration No. (PAN for India)',
			type  : 'text',
			span 	: 12,
			value : rest?.registration_number,
			rules : {
				required : true,
				message  : countryCode === 'IN' ? 'Pan number is Required' : 'Registration Number is Required',
			},
			placeholder: 'PAN',
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
			rules           : {
				required : true,
				message  : countryCode === 'IN' ? 'Address is Required' : 'Registration Extract is Required',
			},
		},
		{
			name        : 'mobile',
			showLabel   : false,
			type        : 'mobile_number',
			codeKey     : 'mobile_country_code',
			numberKey   : 'mobile_number',
			value       : rest?.mobile,
			label       : 'Mobile Number',
			placeholder	: 'mobile',
			rules       : {
				required  : true,
				message   : 'mobile number is required',
				inputType : 'group',
			},

		},
	]
);
