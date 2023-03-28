import { get } from '@cogoport/front/utils';

import commodityTypes from '../configurations/commodity-types.json';

const controls = [
	{
		name    : 'container_size',
		label   : 'Container Size',
		type    : 'select',
		options : [
			{ label: '20FT', value: '20' },
			{ label: '22FT', value: '22' },
			// { label: '44FT', value: '44' },
		],
		rules     : { required: true },
		span      : 3,
		theme     : 'admin',
		className : 'primary sm',
		size      : 'sm',
	},
	{
		label     : 'Container Type',
		name      : 'container_type',
		type      : 'select',
		rules     : { required: true },
		span      : 3,
		theme     : 'admin',
		className : 'primary sm',
		size      : 'sm',
	},
	{
		label    : 'Cargo Weight per Container',
		name     : 'cargo_weight_per_container',
		subLabel : '(in metric tonnes)',
		type     : 'number',
		suffix   : 'MT',
		rules    : {
			required : true,
			max      : '31',
			validate : (value) => (value <= 0
				? 'Cargo Weight Per Container should be greater than zero'
				: undefined),
		},
		span: 3,
	},
	{
		label : 'Container Count',
		name  : 'container_count',
		type  : 'number',
		rules : { required: true, min: '1' },
		span  : 3,
	},
	{
		label   : 'Commodity Type',
		name    : 'commodity_type',
		type    : 'select',
		rules   : { required: true },
		options : commodityTypes,
		span    : 3,
	},
	{
		label : 'Commodity Sub-type',
		name  : 'commodity_subtype',
		type  : 'select',
		rules : { required: true },
		span  : 3,
	},
	{
		label   : 'Packaging Type',
		name    : 'packaging_type',
		type    : 'select',
		options : [
			{
				label : 'Pallet',
				value : 'pallet',
			},
			{
				label : 'Box',
				value : 'box',
			},
			{
				label : 'Crate',
				value : 'crate',
			},
			{
				label : 'Loose',
				value : 'loose',
			},
		],
		rules : { required: true },
		span  : 3,
	},
	{
		name     : 'is_door_pickup',
		type     : 'checkbox',
		options  : [{ value: true, label: 'Door Pickup Required' }],
		multiple : true,
		span     : 3,
	},
	{
		name     : 'is_doorstep_delivery',
		type     : 'checkbox',
		options  : [{ value: true, label: 'Doorstep Delivery Required' }],
		multiple : true,
		span     : 3,
	},
];

const getControls = ({ values }) => controls.map((control) => ({
	...control,
	value: get(values, control.name),
}));

export default getControls;
