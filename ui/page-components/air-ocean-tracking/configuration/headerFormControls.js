const headerFormOceanControls = [
	{
		name        : 'containerNo',
		type        : 'text',
		placeholder : 'Enter Container No/ BL no',
		rules       : { required: true },
	},
	{
		name        : 'shippingLine',
		type        : 'select',
		placeholder : 'Select Shipping Line',
		rules       : { required: true },
	},
];

const headerFormAirControls = [
	{
		name        : 'airBillNo',
		type        : 'text',
		placeholder : 'Enter Airway bill number',
		rules       : { required: true },
	},
	{
		name        : 'airLine',
		type        : 'select',
		placeholder : 'Select airline Line',
		rules       : { required: true },
	},
];
export { headerFormOceanControls, headerFormAirControls };
