const fields = [
	{
		name        : 'city_id',
		labelKey    : 'display_name',
		valueKey    : 'id',
		label       : 'City',
		placeholder : 'Enter city',
		type        : 'select',
		style       : { width: '300px' },
	},
	{
		name         : 'website',
		label        : 'website',
		placeholder  : 'Eneter Website',
		type         : 'text',
		showOptional : false,
		style        : { width: '300px' },
	},

	{
		name         : 'about',
		label        : 'Enter About',
		placeholder  : 'about',
		type         : 'textarea',
		showOptional : false,
		style        : { width: '300px' },
	},
	{
		name        : 'logo',
		label       : 'logo',
		placeholder : 'logo',
		type        : 'file',
		drag        : true,
		accept      :
			'image/*,.pdf,.doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document',
		uploadType   : 'aws',
		format       : ' ',
		rules        : { required: 'Required' },
		showOptional : false,
		style        : { width: '300px' },
	},
];

const getOrganizationControls = ({
	cityOptions = {},
	organizationData,
}) => fields.map((control) => {
	const { name } = control;
	let newControl = { ...control };

	if (name === 'city_id') {
		newControl = { ...newControl, ...cityOptions };
	}
	return { ...newControl };
});
export default getOrganizationControls;
