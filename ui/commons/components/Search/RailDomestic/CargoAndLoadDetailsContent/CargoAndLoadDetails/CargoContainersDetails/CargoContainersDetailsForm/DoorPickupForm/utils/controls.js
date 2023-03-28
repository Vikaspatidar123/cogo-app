import { get } from '@cogoport/front/utils';

const controls = [
	{
		name    : 'cargo_handling',
		label   : 'Origin Cargo Stuffing',
		type    : 'pills',
		options : [
			{ label: 'Factory Stuffing', value: 'stuffing_at_factory' },
			{ label: 'Terminal Stuffing', value: 'stuffing_at_dock' },
		],
		rules : { required: true },
		span  : 12,
	},
	{
		name           : 'location',
		label          : 'Pickup Zipcode',
		type           : 'location-select',
		optionsListKey : 'locations',
		params         : {
			filters: {
				type: ['airport', 'seaport', 'pincode', 'cfs'],
			},
		},
		rules : { required: true },
		rows  : 2,
		span  : 12,
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
