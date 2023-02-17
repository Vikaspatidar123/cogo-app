export const loadControls = [
	{
		name               : 'containerCalculator',
		type               : 'fieldArray',
		showButtons        : true,
		isChildRequired    : true,
		buttonText         : 'Add Product',
		optionsListKey     : 'all_users',
		initialValue       : 0,
		noDeleteButtonTill : 1,
		value              : [
			{
				type        : 'BOXES',
				productName : 'TEA',
				length      : '1000',
				width       : '1000',
				Height      : '1000',
				typeWeight  : '10',
				quantity    : '25',
			},
		],
		controls: [
			{
				name        : 'type',
				label       : 'Type',
				type        : 'select',
				span        : 1.5,
				placeholder : 'Select',
				required    : true,

				options: [
					{
						label : 'Boxes',
						value : 'Boxes',
					},
					{
						label : 'Sacks',
						value : 'Sacks',
					},
					{
						label : 'Big Bags',
						value : 'BigBags',
					},
				],
			},
			{
				name     : 'productName',
				label    : 'Product Name',
				type     : 'text',
				span     : 1.5,
				required : true,
				// value: 'TEA',
			},
			{
				name        : 'length',
				label       : 'Length',
				type        : 'number',
				span        : 1.5,
				placeholder : 'mm',
				suffix      : 'mm',
				required    : true,

				// defaultValue: '11',
			},
			{
				name        : 'width',
				label       : 'Width',
				type        : 'number',
				span        : 1.5,
				placeholder : 'mm',
				required    : true,
				suffix      : 'mm',
			},
			{
				name        : 'Height',
				label       : 'height',
				type        : 'number',
				span        : 1.5,
				placeholder : 'mm',
				required    : true,
				suffix      : 'mm',
			},
			{
				name        : 'typeWeight',
				label       : 'Weight',
				type        : 'number',
				span        : 1.5,
				placeholder : 'kg',
				required    : true,
			},
			{
				name     : 'quantity',
				label    : 'Quantity',
				span     : 1.5,
				type     : 'number',
				required : true,
			},
		],
	},
];

const getControls = () => loadControls.map((control) => {
	const newControl = { ...control };
	return { ...newControl };
});

export default getControls;
