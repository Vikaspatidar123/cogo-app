import GLOBAL_CONSTANTS from '@cogo/globalization/constants/globals.json';

const { IN: INDIA_COUNTRY_ID } = GLOBAL_CONSTANTS.country_ids;

const getControls = () => {
	const countryIds = [INDIA_COUNTRY_ID];
	return [
		{
			label: 'Origin Location',
			name: 'origin_location_id',
			placeholder: 'City/Port/Airport/Pincode',
			includedInOptions: false,
			type: 'location-select',
			optionsListKey: 'locations',
			params: {
				apply_sorting: false,
				filters: {
					type: ['pincode', 'seaport', 'airport', 'city', 'warehouse'],
					country_id: countryIds,
				},
			},
			rules: { required: 'Origin Location is required' },
		},
		{
			label: 'Destination Location',
			name: 'destination_location_id',
			placeholder: 'City/Port/Airport/Pincode',
			includedInOptions: false,
			type: 'location-select',
			optionsListKey: 'locations',
			params: {
				apply_sorting: false,
				filters: {
					type: ['pincode', 'seaport', 'airport', 'city', 'warehouse'],
					country_id: countryIds,
				},
			},
			rules: { required: 'Destination Location is required' },
		},
	];
};
export default getControls;
