import { get } from '@cogoport/front/utils';

const controls = [
	{
		id: 'rail_domestic_search--origin_location_id',
		label: 'Origin Location',
		name: 'origin_location_id',
		placeholder: 'Railway Terminal',
		noOptionsMessage: 'Type to search...',
		includedInOptions: false,
		type: 'location-select',
		optionsListKey: 'locations_v2',
		params: { filters: { type: ['railway_terminal'], status: 'active' } },
		rules: { required: true },
	},
	{
		id: 'rail_domestic_search--destination_location_id',
		label: 'Destination Location',
		name: 'destination_location_id',
		placeholder: 'Railway Terminal',
		noOptionsMessage: 'Type to search...',
		includedInOptions: false,
		type: 'location-select',
		optionsListKey: 'locations_v2',
		params: { filters: { type: ['railway_terminal'], status: 'active' } },
		rules: { required: true },
	},
];

const getControls = ({ values }) => {
	return controls.map((control) => {
		return {
			...control,
			value: get(values, control.name) || '',
		};
	});
};

export default getControls;
