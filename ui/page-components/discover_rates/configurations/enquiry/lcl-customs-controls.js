const lclCustomsControls = () => (
	[
		{
			name        : 'commodity_description',
			label       : 'Commodity Description',
			type        : 'textarea',
			rows        : 3,
			condition   : {},
			placeholder : 'Cargo Description, packaging details, etc.',
			rules       : { required: 'Required', minLength: 5 },

		},
	]
);
export default lclCustomsControls;
