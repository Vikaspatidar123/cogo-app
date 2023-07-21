// import GLOBAL_CONSTANTS from '@/ui/commons/constants/globals';
// import { getCountryIds } from '@/ui/commons/utils/getCountryDetails';

// const SUPPORTED_COUNTRY_CODE = GLOBAL_CONSTANTS.service_supported_countries.ftl_freight.countries;

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
				type: ['seaport', 'airport', 'pincode', 'railway_terminal'],
				// id   : getCountryIds({ countryCodes: SUPPORTED_COUNTRY_CODE }),
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
				type: ['seaport', 'airport', 'pincode', 'railway_terminal'],
				// id   : getCountryIds({ countryCodes: SUPPORTED_COUNTRY_CODE }),
			},
		},
		rules: { required: 'Destination Location is required' },
	},
];
export default getControls;
