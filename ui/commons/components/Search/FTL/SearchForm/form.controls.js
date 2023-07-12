import GLOBAL_CONSTANTS from '@/ui/commons/constants/globals';

const SUPPORTED_COUNTRY_IDS = GLOBAL_CONSTANTS.service_supported_countries.feature_supported_service.common
	.services.ftl_freight.default_country_ids;

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
				id   : SUPPORTED_COUNTRY_IDS,
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
				id   : SUPPORTED_COUNTRY_IDS,
			},
		},
		rules: { required: t('discoverRates:destination_port_error_message') },
	},
];
export default getControls;
