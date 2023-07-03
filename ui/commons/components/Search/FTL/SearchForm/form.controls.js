import GLOBAL_CONSTANTS from '@/ui/commons/constants/globals';
import getCountryId from '@/ui/commons/utils/getCountryId';

const INDIA_COUNTRY_ID = getCountryId(GLOBAL_CONSTANTS.country_code.IN);
const VIETNAM_COUNTRY_ID = getCountryId(GLOBAL_CONSTANTS.country_code.VN);

const countryIds = [INDIA_COUNTRY_ID, VIETNAM_COUNTRY_ID];

const getControls = () => [
	{
		label             : 'Origin Location',
		name              : 'origin_location_id',
		placeholder       : 'Port/Airport/Pincode/Railway Terminal',
		includedInOptions : false,
		type              : 'async_select',
		asyncKey          : 'locations',
		style             : { width: '300px' },
		params            : {
			apply_sorting : false,
			filters       : {
				type       : ['seaport', 'airport', 'pincode', 'railway_terminal'],
				country_id : countryIds,
			},
		},
		rules: { required: 'Origin Location is required' },
	},
	{
		label             : 'Destination Location',
		name              : 'destination_location_id',
		placeholder       : 'Port/Airport/Pincode/Railway Terminal',
		includedInOptions : false,
		type              : 'async_select',
		asyncKey          : 'locations',
		style             : { width: '300px' },
		params            : {
			apply_sorting : false,
			filters       : {
				type       : ['seaport', 'airport', 'pincode', 'railway_terminal'],
				country_id : countryIds,
			},
		},
		rules: { required: 'Destination Location is required' },
	},
];
export default getControls;
