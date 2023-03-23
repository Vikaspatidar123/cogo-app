import GLOBAL_CONSTANTS from '@cogo/globalization/constants/globals.json';

const { IN: INDIA_COUNTRY_ID, VN: VIETNAM_COUNTRY_ID } =
	GLOBAL_CONSTANTS.country_ids;

const countryIds = [INDIA_COUNTRY_ID, VIETNAM_COUNTRY_ID];

const getControls = () => {
	return [
		{
			label: 'Origin Location',
			name: 'origin_location_id',
			placeholder: 'Port/Airport/Pincode/Railway Terminal',
			includedInOptions: false,
			type: 'location-select',
			optionsListKey: 'locations',
			params: {
				apply_sorting: false,
				filters: {
					type: ['seaport', 'airport', 'pincode', 'railway_terminal'],
					country_id: countryIds,
				},
			},
			rules: { required: 'Origin Location is required' },
		},
		{
			label: 'Destination Location',
			name: 'destination_location_id',
			placeholder: 'Port/Airport/Pincode/Railway Terminal',
			includedInOptions: false,
			type: 'location-select',
			optionsListKey: 'locations',
			params: {
				apply_sorting: false,
				filters: {
					type: ['seaport', 'airport', 'pincode', 'railway_terminal'],
					country_id: countryIds,
				},
			},
			rules: { required: 'Destination Location is required' },
		},
	];
};
export default getControls;
