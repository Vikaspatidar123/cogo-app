const fields = ({ t = () => { } }) => ([
	{
		name: 'origin_port',
		label: t('oceanSchedule:origin_port_label'),
		type: 'select',
		placeholder: t('oceanSchedule:origin_port_placeholder'),
		rules: { required: t('oceanSchedule:origin_port_err_message') },
	},
	{
		name: 'destination_port',
		label: t('oceanSchedule:destination_port_label'),
		type: 'select',
		placeholder: t('oceanSchedule:destination_port_placeholder'),
		rules: { required: t('oceanSchedule:destination_port_err_message') },
	},
]);
const getControls = ({
	portOptions = {},
	t,
}) => fields({ t }).map((control) => {
	const newControl = { ...control, ...portOptions };

	return { ...newControl };
});

export default getControls;
