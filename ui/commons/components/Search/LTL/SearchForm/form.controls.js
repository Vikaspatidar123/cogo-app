import GLOBAL_CONSTANTS from '@/ui/commons/constants/globals';
import getCountryDetails from '@/ui/commons/utils/getCountryDetails';

const SUPPORTED_COUNTRY_CODE = GLOBAL_CONSTANTS.service_supported_countries.ltl_freight.countries;
const SUPPORTED_COUNTRY_IDS = SUPPORTED_COUNTRY_CODE.map((code) => {
	const countryInfo = getCountryDetails({ country_code: code });
	return countryInfo.id;
});

const getControls = () => [
	{
		label             : 'Origin Location',
		name              : 'origin_location_id',
		placeholder       : 'City/Port/Airport/Pincode',
		includedInOptions : false,
		type              : 'async_select',
		asyncKey          : 'locations',
		style             : { width: '300px' },
		params            : {
			apply_sorting : false,
			filters       : {
				type : ['pincode', 'seaport', 'airport', 'city', 'warehouse'],
				id   : SUPPORTED_COUNTRY_IDS,
			},
		},
		rules: { required: 'Origin Location is required' },
	},
	{
		label             : 'Destination Location',
		name              : 'destination_location_id',
		placeholder       : 'City/Port/Airport/Pincode',
		includedInOptions : false,
		style             : { width: '300px' },
		type              : 'async_select',
		asyncKey          : 'locations',
		params            : {
			apply_sorting : false,
			filters       : {
				type : ['pincode', 'seaport', 'airport', 'city', 'warehouse'],
				id   : SUPPORTED_COUNTRY_IDS,
			},
		},
		rules: { required: 'Destination Location is required' },
	},
];
export default getControls;
