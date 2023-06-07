const airCustomsControls = () => (
	[
		{
			name        : 'commodity_description',
			label       : 'Cargo Description',
			type        : 'textarea',
			rows        : 3,
			placeholder : 'Cargo Description, packaging details, etc.',
			rules       : { required: 'Required', minLength: 5 },
		},
	]
);

export default airCustomsControls;
