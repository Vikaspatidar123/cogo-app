const controls = [
	{
		label       : 'Incoterm',
		name        : 'incoterm',
		type        : 'text',
		size        : 'sm',
		placeholder : 'Enter Incoterm',
		rules       : {
			required: '*Required',
		},
		disabled: true,
	},
	{
		label       : 'Consignment Value',
		name        : 'consignment',
		type        : 'number',
		size        : 'sm',
		placeholder : 'Enter Consignment',
		rules       : {
			required: '*Required',
		},
		disabled: true,
	},
	{
		label       : 'Result Currency',
		name        : 'result',
		type        : 'text',
		size        : 'sm',
		placeholder : 'Enter Result Currency',
		rules       : {
			required: '*Required',
		},
		disabled: true,
	},
	{
		label       : 'Total Applicable Charges',
		name        : 'applicable',
		type        : 'number',
		size        : 'sm',
		placeholder : 'Enter Total Applicable Charges',
		rules       : {
			required: '*Required',
		},
		disabled: true,
	},
];

const getControls = () => controls.map((control) => control);

export default getControls;
