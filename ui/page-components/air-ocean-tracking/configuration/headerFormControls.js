const headerFormOceanControls = [
	{
		name        : 'containerNo',
		type        : 'text',
		placeholder : 'Enter Container No/ BL no',
		rules       : { required: true },
	},
	{
		name        : 'shippingLine',
		type        : 'async_select',
		asyncKey    : 'shippingline_list',
		initialCall : true,
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
		type        : 'async_select',
		asyncKey    : 'airline_list',
		initialCall : true,
		placeholder : 'Select Airway Line',
		rules       : { required: true },
	},
];
export { headerFormOceanControls, headerFormAirControls };
