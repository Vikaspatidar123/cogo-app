const fields = ({ t = () => { } }) => [
	{
		name: 'origin_airport',
		label: t('airSchedule:origin_air_port_text'),
		type: 'select',
		placeholder: t('airSchedule:origin_placeholder'),
		rules: { required: t('airSchedule:origin_error_message') },
	},
	{
		name: 'destination_airport',
		label: t('airSchedule:destination_air_port_text'),
		type: 'select',
		placeholder: t('airSchedule:destination_placeholder'),
		rules: { required: t('airSchedule:destination_error_message') },
	},
];
const getControls = ({
	airportOptions = {},
	t = () => { },
}) => fields({ t }).map((control) => {
	const newControl = { ...control, ...airportOptions };

	return { ...newControl };
});

export default getControls;
