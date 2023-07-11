import GLOBAL_CONSTANTS from '@/ui/commons/constants/globals';

const { IN: INDIA_COUNTRY_ID, VN: VIETNAM_COUNTRY_ID } = GLOBAL_CONSTANTS.country_ids;

const countryIds = [INDIA_COUNTRY_ID, VIETNAM_COUNTRY_ID];

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
				type       : ['seaport', 'airport', 'pincode', 'railway_terminal'],
				country_id : countryIds,
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
				type       : ['seaport', 'airport', 'pincode', 'railway_terminal'],
				country_id : countryIds,
			},
		},
		rules: { required: t('discoverRates:destination_port_error_message') },
	},
];
export default getControls;
