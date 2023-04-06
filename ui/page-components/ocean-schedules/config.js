const fields = [
	{
		name        : 'origin_port',
		label       : 'Origin Port',
		type        : 'select',
		placeholder : 'Select Origin Port',
		rules       : { required: 'Origin Port is required' },
	},
	{
		name        : 'destination_port',
		label       : 'Destination Port',
		type        : 'select',
		placeholder : 'Select Destination Port',
		rules       : { required: 'Destination Port is required' },
	},
];
const getControls = ({
	portOptions = {},
}) => fields.map((control) => {
	const newControl = { ...control, ...portOptions };

	return { ...newControl };
});

export default getControls;
