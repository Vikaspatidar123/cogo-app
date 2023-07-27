import { getCountrySpecificData } from '@/ui/commons/constants/CountrySpecificDetail';

export const controls = ({ country_code, rest }) => {
	const IDENTIFICAITON_LABEL = getCountrySpecificData({
		country_code,
		accessorType : 'identification_number',
		accessor     : 'label',
	});
	const ADDRESS_LABEL = getCountrySpecificData({
		country_code,
		accessorType : 'address',
		accessor     : 'label',
	});
	return [
		{
			name  : 'registration_number',
			label : IDENTIFICAITON_LABEL,
			type  : 'text',
			span 	: 12,
			value : rest?.registration_number,
			rules : {
				required: `${IDENTIFICAITON_LABEL} is required`,
			},
			placeholder: 'PAN',
		},
		{
			name     : 'utility_bill_document_url',
			label    : 'Company\'s Address Proof',
			type     : 'file',
			span    	: 12,
			multiple : false,
			value    : rest?.utility_bill_document_url,
			rules    : {
				required: `${ADDRESS_LABEL} is Required`,
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
				required  : 'mobile number is required',
				inputType : 'group',
			},

		},
	];
};
