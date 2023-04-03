import { isEmpty } from '@cogoport/utils';

import styles from './styles.module.css';

const getControls = ({ showFilledValues }) => [
	{
		name               : 'dimensions',
		type               : 'fieldArray',
		label              : 'Add',
		showButtons        : true,
		buttonText         : 'Add More Packages',
		noDeleteButtonTill : 1,
		value              : isEmpty(showFilledValues?.perPackagedata?.dimensions)
			? [
				{
					package_type : 'pallet',
					handling     : 'stackable',
					units        : 'cm',
					quantity     : 1,
					total_weight : 1,
					length       : 1,
					width        : 1,
					height       : 1,
				},
			]
			: showFilledValues?.perPackagedata?.dimensions,
		controls: [
			{
				name        : 'package_type',
				type        : 'select',
				placeholder : 'Select',
				label       : 'Packages type',
				span        : 4,
				value       : 'pallet',
				rules       : {
					required: true,
				},
				options: [
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
			},
			{
				name        : 'quantity',
				type        : 'number',
				placeholder : 0,
				label       : 'Quantity',
				span        : 4,
				value       : showFilledValues?.perPackagedata?.quantity,
				rules       : {
					min      : 1,
					required : true,
				},
			},
			{
				name   : 'total_weight',
				type   : 'number',
				value  : showFilledValues?.perPackagedata?.total_weight,
				label  : 'Weight per pkg',
				suffix : <div className={styles.suffix}>kgs</div>,
				span   : 4,
				rules  : {
					min      : 1,
					max      : 150,
					required : true,
				},
			},
			{
				name        : 'length',
				type        : 'number',
				label       : 'Length',
				placeholder : 'L',
				span        : 2,
				rules       : {
					min      : 1,
					max      : 99,
					required : true,
				},
			},
			{
				name        : 'width',
				type        : 'number',
				label       : 'Width',
				placeholder : 'W',
				span        : 2,
				rules       : {
					min      : 1,
					max      : 99,
					required : true,
				},
			},
			{
				name        : 'height',
				type        : 'number',
				label       : 'Height',
				placeholder : 'H',
				span        : 2,
				rules       : {
					min      : 1,
					max      : 150,
					required : true,
				},
			},
			{
				name     : 'units',
				type     : 'text',
				label    : 'unit',
				span     : 2,
				value    : 'cm',
				disabled : true,
				style    : {
					marginRight: '10px',
				},
				rules: {
					required: true,
				},
			},
			{
				name    : 'handling',
				type    : 'select',
				label   : 'Handling',
				span    : 3,
				value   : 'stackable',
				options : [
					{
						label : 'Stackable',
						value : 'stackable',
					},
					{
						label : 'Non-Stackable',
						value : 'non_stackable',
					},
				],
				placeholder : 'Select',
				style       : {
					menu: {
						right        : 0,
						background   : 'white',
						boxShadow    : '0 4px 80px rgba(0, 0, 0, 0.15)',
						borderRadius : 10,
						zIndex       : 99999,
					},
				},
				rules: {
					required: true,
				},
			},
		],
	},
];

export default getControls;
