import GLOBAL_CONSTANTS from '@/ui/commons/constants/globals';

const SUPPORTED_COUNTRY_IDS = GLOBAL_CONSTANTS.service_supported_countries.feature_supported_service.common
	.services.ltl_freight.default_country_ids;
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
