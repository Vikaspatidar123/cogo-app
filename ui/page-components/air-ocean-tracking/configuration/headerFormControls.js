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
		rules       : {
			required : true,
			pattern  : {
				value   : /^\d{3}-\d{8}$/,
				message : 'Invalid AirLine Number',
			},
		},
	},
	{
		name        : 'airLine',
		type        : 'select',
		asyncKey    : 'airline_list',
		initialCall : true,
		placeholder : 'Select Airway Line',
		rules       : { required: 'required' },

	},
];

const defaultValues = {
	shipmentNumber : '',
	shippingLine   : '',
	airLine        : '',
};

const headerFormControls = ({ trackingType = 'ocean',	operatorData = {} }) => {
	const { shippingLineData = [], airLineData = [] } = operatorData || {};
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
