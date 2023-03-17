const controls = [
	{
		label       : 'Incoterm',
		name        : 'incoterm',
		type        : 'text',
		placeholder : 'Enter Incoterm',
		rules       : {
			required: '*Required',
		},
		disabled : true,
		span     : 15,
	},
	{
		label       : 'Consignment Value',
		name        : 'consignment',
		type        : 'number',
		placeholder : 'Enter Consignment',
		rules       : {
			required: '*Required',
		},
		disabled : true,
		span     : 13,
	},
	{
		label       : 'Result Currency',
		name        : 'result',
		type        : 'text',
		placeholder : 'Enter Result Currency',
		rules       : {
			required: '*Required',
		},
		disabled : true,
		span     : 10,
	},
	{
		label       : 'Total Applicable Charges',
		name        : 'applicable',
		type        : 'number',
		placeholder : 'Enter Total Applicable Charges',
		rules       : {
			required: '*Required',
		},
		disabled : true,
		span     : 13,
	},
];

const getControls = () => controls.map((control) => control);

export default getControls;
