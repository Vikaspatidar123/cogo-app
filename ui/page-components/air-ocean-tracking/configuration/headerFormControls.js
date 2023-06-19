const headerFormOceanControls = [
	{
		name        : 'shipmentNumber',
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
		name        : 'shipmentNumber',
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

const defaultValues = {
	shipmentNumber : '',
	shippingLine   : '',
	airLine        : '',
};

const headerFormControls = ({ trackingType = 'ocean' }) => (
	trackingType === 'ocean' ? headerFormOceanControls : headerFormAirControls
);

export default headerFormControls;
export { defaultValues };
