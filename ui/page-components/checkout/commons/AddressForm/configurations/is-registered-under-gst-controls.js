import { CountrySpecificData, getCountrySpecificData } from '@/ui/commons/constants/CountrySpecificDetail';
import getGeoConstants from '@/ui/commons/constants/geo';

const geo = getGeoConstants();
const REGISTRATION_LABEL = getCountrySpecificData({
	country_id    : geo.country.id,
	accessorType  : 'registration_number',
	accessor      : 'label',
	isDefaultData : true,

});
const getAddressRegisteredUnderGst = ({ organizationCountryId }) => [
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

export default getAddressRegisteredUnderGst;
