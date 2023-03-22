const haulageControls = () => [
	{
		label: 'Preferred Origin Main Port',
		name: 'preferred_origin_main_port_id',
		placeholder: 'Search via port name/code',
		caret: true,
		type: 'location-select',
		optionsListKey: 'locations',
		grouped: ['city', 'country'],
		params: { filters: { type: ['seaport', 'country', 'city'] } },
		condition: { trade_type: ['export'] },
	},
	{
		label: 'Preferred Destination Main Port',
		name: 'preferred_destination_main_port_id',
		placeholder: 'Search via port name/code',
		caret: true,
		type: 'location-select',
		optionsListKey: 'locations',
		grouped: ['city', 'country'],
		params: { filters: { type: ['seaport', 'country', 'city'] } },
		condition: { trade_type: ['import'] },
	},
];
export default haulageControls;
