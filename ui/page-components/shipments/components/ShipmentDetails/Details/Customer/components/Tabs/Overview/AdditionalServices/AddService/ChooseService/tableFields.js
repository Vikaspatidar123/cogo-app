const tableFields = (priceRequest, countObj) => [
	{
		label : `Services (${countObj.listCount})`,
		key   : 'name',
		span  : 6,
		func  : 'startCase',
	},
	{
		label : 'Unit',
		key   : 'units',
		span  : 3,
		func  : 'startCase',
	},
	{
		key    : '',
		span   : 3,
		render : priceRequest,
	},
];

export default tableFields;
