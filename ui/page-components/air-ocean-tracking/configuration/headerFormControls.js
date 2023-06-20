const headerFormOceanControls = [
	{
		name        : 'shipmentNumber',
		type        : 'text',
		placeholder : 'Enter Container No/ BL no',
		rules       : { required: true },
	},
	{
		name        : 'shippingLine',
		type        : 'select',
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
		type        : 'select',
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

const headerFormControls = ({ trackingType = 'ocean',	shippingLineData = [], airLineData = [] }) => {
	const OPTION_MAPPING = {
		ocean : shippingLineData,
		air   : airLineData,
	};

	const controls = trackingType === 'ocean' ? headerFormOceanControls : headerFormAirControls;

	return controls.map((control) => {
		if (control.name === 'shippingLine' || control.name === 'airLine') {
			return {
				...control,
				options: OPTION_MAPPING[trackingType],
			};
		}

		return control;
	});
};

export default headerFormControls;
export { defaultValues };
