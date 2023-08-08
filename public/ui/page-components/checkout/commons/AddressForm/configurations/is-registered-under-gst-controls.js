import { getCountrySpecificData } from '@/ui/commons/constants/CountrySpecificDetail';

const getAddressRegisteredUnderGst = ({ organizationCountryId }) => {
	const REGISTRATION_LABEL = getCountrySpecificData({
		country_id    : organizationCountryId,
		accessorType  : 'registration_number',
		accessor      : 'label',
		isDefaultData : true,

	});
	return [
		{
			type    : 'checkbox',
			name    : 'isAddressRegisteredUnderGst',
			label   : `Not Registered Under ${REGISTRATION_LABEL} Law`,
			options : [
				{
					value : true,
					label : `Not Registered Under ${REGISTRATION_LABEL} Law`,
				},
			],
			multiple : true,
			span     : 12,
		},
	];
};

export default getAddressRegisteredUnderGst;
