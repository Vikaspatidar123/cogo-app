const fields = [{
	name        : 'country_id',
	label       : 'Country',
	type        : 'select',
	placeholder : 'Select country',
	condition   : {
		type: [
			'city',
			'seaport',
			'airport',
			'pincode',
			'cfs',
			'cluster',
			'region',
			'yard',
			'railway_terminal',
			'warehouse',
		],
	},
	asyncKey : 'locations',
	rules    : { required: 'Country is required' },
}];
const getControls = ({
	cityOptions = {},
}) => fields.map((control) => {
	const { name } = control;
	let newControl = { ...control };

	if (name === 'country_id') {
		newControl = { ...newControl, ...cityOptions };
	}
	return { ...newControl };
});

export default getControls;
