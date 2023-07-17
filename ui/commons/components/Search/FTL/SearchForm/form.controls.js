import GLOBAL_CONSTANTS from '@/ui/commons/constants/globals';
import { getCountryIds } from '@/ui/commons/utils/getCountryDetails';

const SUPPORTED_COUNTRY_CODE = GLOBAL_CONSTANTS.service_supported_countries.ftl_freight.countries;

const getControls = ({ t }) => [
	{
		label             : t('discoverRates:origin_location_label'),
		name              : 'origin_location_id',
		placeholder       : t('discoverRates:all_mode_placeholder'),
		includedInOptions : false,
		type              : 'async_select',
		asyncKey          : 'locations',
		style             : { width: '300px' },
		params            : {
			apply_sorting : false,
			filters       : {
				type : ['seaport', 'airport', 'pincode', 'railway_terminal'],
				id   : getCountryIds({ countryCodes: SUPPORTED_COUNTRY_CODE }),
			},
		},
		rules: { required: t('discoverRates:origin_port_error_message') },
	},
	{
		label             : t('discoverRates:destination_location_label'),
		name              : 'destination_location_id',
		placeholder       : t('discoverRates:all_mode_placeholder'),
		includedInOptions : false,
		type              : 'async_select',
		asyncKey          : 'locations',
		style             : { width: '300px' },
		params            : {
			apply_sorting : false,
			filters       : {
				type : ['seaport', 'airport', 'pincode', 'railway_terminal'],
				id   : getCountryIds({ countryCodes: SUPPORTED_COUNTRY_CODE }),
			},
		},
		rules: { required: t('discoverRates:destination_port_error_message') },
	},
];
export default getControls;
