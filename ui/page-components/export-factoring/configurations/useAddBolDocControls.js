const controls = [
	{
		name        : 'bl_number',
		label       : 'Bill of Lading Number',
		type        : 'text',
		placeholder : 'Enter Bill Number',
		span        : 6,
		rules       : {
			required: true,
		},
	},
	{
		name                  : 'bl_date',
		label                 : 'Bill of Lading Date',
		type                  : 'datepicker',
		placeholder           : 'DD-MM-YYYY',
		span                  : 6,
		isPreviousDaysAllowed : true,
		maxDate               : new Date(),
		rules                 : { required: true },
	},
	{
		name        : 'consignee_name',
		label       : 'Consignee Name',
		type        : 'text',
		placeholder : 'Type Here',
		span        : 6,
		rules       : { required: true },
	},
	{
		name        : 'origin_country',
		label       : 'Origin Country',
		type        : 'async_select',
		span        : 6,
		asyncKey    : 'locations',
		initialCall : true,
		params      : {
			filters: {
				type: ['country'],
			},
		},
		defaultOptions : true,
		placeholder    : 'Select Country',
		rules          : { required: 'Country is required' },
		// handleChange   : (obj) => {
		// 	setCountry({
		// 		...country,
		// 		origin_country_id   : obj?.country_id,
		// 		origin_country_name : obj?.name,
		// 	});
		// },
	},
	{
		name        : 'shipping_line',
		label       : 'Carrier/Shipping Line',
		type        : 'async_select',
		asyncKey    : 'shipping-lines',
		initialCall : true,
		placeholder : 'Type Here',
		span        : 6,
		rules       : { required: true },
	},
	{
		name        : 'vessel_name',
		label       : 'Vessel Name',
		type        : 'text',
		placeholder : 'Type Here',
		span        : 6,
		rules       : { required: true },
	},
	{
		name        : 'container_number',
		label       : 'Container Number',
		type        : 'creatable-select',
		// options     : [],
		multiple    : true,
		placeholder : 'Type Here',
		span        : 6,
		rules       : { required: true },
	},
	{
		name        : 'goods',
		label       : 'Goods',
		type        : 'creatable-select',
		options     : [],
		multiple    : true,
		placeholder : 'Type Here',
		span        : 6,
		rules       : { required: true },
	},
	{
		name        : 'destination_port',
		label       : 'Destination Port',
		type        : 'async_select',
		asyncKey    : 'locations',
		initialCall : true,
		placeholder : 'Type Here',
		params      : {
			apply_sorting : false,
			filters       : {
				type: ['seaport'],
			},
		},
		span  : 6,
		rules : { required: true },
		// handleChange : (obj) => {
		// 	setCountry({
		// 		...country,
		// 		destination_port_id   : obj?.id,
		// 		destination_port_name : obj?.name,
		// 	});
		// },
	},
	{
		name     : 'consignee_country',
		label    : 'Consignee Country',
		type     : 'async_select',
		span     : 6,
		asyncKey : 'locations',
		params   : {
			filters: {
				type: ['country'],
			},
		},
		defaultOptions : true,
		placeholder    : 'Select Country',
		rules          : { required: 'Country is required' },

	},
	{
		name       : 'bill_loading',
		label      : 'Upload Document',
		type       : 'file',
		drag       : true,
		span       : 6,
		uploadType : 'aws',
		accept     : '.pdf',
		maxSize    : '5242880',
		height     : 76,
		rules      : { required: true },
	},
];

export const useAddBolDocControls = () => controls.map((control) => ({ ...control }));
