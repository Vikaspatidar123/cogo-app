const fields = [
	{
		name        : 'origin_airport',
		label       : 'Origin AirPort',
		type        : 'select',
		placeholder : 'Select Origin AirPort',
		rules       : { required: 'Origin AirPort is required' },
	},
	{
		name        : 'destination_airport',
		label       : 'Destination AirPort',
		type        : 'select',
		placeholder : 'Select Destination AirPort',
		rules       : { required: 'Destination AirPort is required' },
	},
];
const getControls = ({
	airportOptions = {},
}) => fields.map((control) => {
	const newControl = { ...control, ...airportOptions };

	return { ...newControl };
});

export default getControls;
