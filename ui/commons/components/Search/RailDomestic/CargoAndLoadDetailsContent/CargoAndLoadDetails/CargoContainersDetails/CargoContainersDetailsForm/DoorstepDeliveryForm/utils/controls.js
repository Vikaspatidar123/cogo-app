import { get } from '@cogoport/front/utils';

const controls = [
	{
		name    : 'cargo_handling',
		label   : 'Destination Cargo Handling',
		type    : 'pills',
		caret   : true,
		span    : 12,
		options : [
			{
				label : 'Destuffing at Factory',
				value : 'delivery_from_dock',
			},
			{
				label : 'Destuffing at Terminal',
				value : 'destuffing_at_dock',
			},
		],
		rules: { required: true },
	},
	{
		name           : 'location',
		label          : 'Pickup zipcode',
		defaultOptions : true,
		type           : 'location-select',
		optionsListKey : 'locations',
		params         : {
			filters: {
				type: ['airport', 'seaport', 'pincode', 'cfs'],
			},
		},
		span  : 12,
		rules : {
			required: true,
		},
	},
	{
		name  : 'address',
		label : 'Address',
		type  : 'textarea',
		rows  : 2,
		span  : 12,
	},
	{
		name           : 'truck_type',
		label          : 'Truck Type',
		type           : 'select',
		optionsListKey : 'truck-types',
		multiple       : false,
		rules          : { required: true },
		span           : 12,
	},
	{
		name  : 'trucks_count',
		label : 'Trucks count',
		type  : 'number',
		rules : { required: true, min: '0' },
		span  : 12,
	},
];

const getControls = ({ values }) => controls.map((control) => {
	const { name } = control;

	return {
		...control,
		value: get(values, name) || '',
	};
});

export default getControls;
