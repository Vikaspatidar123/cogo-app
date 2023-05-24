const controls = ({
	OPTIONS,
	// cargo_clearance_date,
	tomorrow,
	showFilledValues,
	commoditySubtypeOptions,
}) => [
	{
		name                  : 'cargo_date',
		label                 : 'Estimate Delivery Date',
		type                  : 'datepicker',
		span                  : 12,
		isPreviousDaysAllowed : false,
		value                 : showFilledValues.cargoDate || tomorrow,
		rules                 : { required: 'This is required' },
	},
	{
		name    : 'commodity_type',
		label   : 'Commodity Type',
		value   : showFilledValues.commodityType,
		type    : 'select',
		span    : 6,
		options : OPTIONS,
		rules   : { required: true },
	},
	{
		name    : 'commodity_subtype',
		label   : 'Commodity Subtype',
		value   : showFilledValues?.commoditySubType,
		type    : 'select',
		span    : 6,
		options : commoditySubtypeOptions,
		rules   : { required: true },
	},
];

export default controls;
