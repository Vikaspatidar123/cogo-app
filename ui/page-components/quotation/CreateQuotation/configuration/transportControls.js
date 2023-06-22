const transportControls = ({ transportMode }) => [
	{
		name             : 'originId',
		key              : 'originId',
		placeholder      : transportMode === 'AIR' ? 'Enter Origin' : 'Enter Origin Port',
		label            : transportMode === 'AIR' ? 'Origin' : 'Origin Port',
		type             : 'async_select',
		size             : 'md',
		asyncKey         : 'locations',
		noOptionsMessage : 'Type to search...',
		isClearable      : true,

		params: {
			filters: { type: [transportMode === 'AIR' ? 'airport' : 'seaport'] },
		},
		rules: { required: true },
	},
	{
		name             : 'destinationId',
		key              : 'destinationId',
		placeholder      : transportMode === 'AIR' ? 'Enter Destination' : 'Enter Destination Port',
		label            : transportMode === 'AIR' ? 'Destination' : 'Destination Port',
		type             : 'async_select',
		size             : 'md',
		asyncKey         : 'locations',
		noOptionsMessage : 'Type to search...',
		isClearable      : true,

		params: {
			filters: { type: [transportMode === 'AIR' ? 'airport' : 'seaport'] },
		},
		rules: { required: true },
	},
];

export default transportControls;
