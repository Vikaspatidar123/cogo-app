import { Tooltip } from '@cogoport/components';
import { IcMInfo } from '@cogoport/icons-react';

import styles from './styles.module.css';

const WEIGHT_UNIT_MAPPING = {
	weight_by_total: [
		{
			label : 'KG/TOTAL',
			value : 'kg_total',
		},
		{
			label : 'LB/TOTAL',
			value : 'lb_total',
		},
	],
	weight_by_unit: [
		{
			label : 'KG/UNIT',
			value : 'kg_unit',
		},
		{
			label : 'LB/UNIT',
			value : 'lb_unit',
		},
	],
};

const SELECTED_STYLE = {
	color          : 'blue',
	textDecoration : 'underline',
};

const getWeightLabel = () => (
	<div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
		<text style={{ marginRight: '2px' }}>Weight</text>
		<Tooltip
			placement="right"
			animation="shift-away"
			content={(
				<div style={{ fontSize: '12px' }}>
					For rate calculation, weight will be converted to KG
				</div>
			)}
		>
			<div className={styles.flex}>
				<IcMInfo />
			</div>
		</Tooltip>
	</div>
);

function GetWeightUnitLabel({
	selectedWeightType = '',
	setSelectedWeightType = () => {},
}) {
	return (
		<Tooltip
			placement="right"
			animation="shift-away"
			content={(
				<div style={{ fontSize: '12px' }}>
					For rate calculation, weight will be converted to KG
				</div>
			)}
		>
			<div className={styles.selected_weight_type}>
				<text
					{...(selectedWeightType === 'weight_by_unit' ? SELECTED_STYLE : null)}
					onClick={() => setSelectedWeightType('weight_by_unit')}
				>
					(Unit
				</text>
				<text style={{ marginRight: '2px', marginLeft: '2px' }}>|</text>
				<text
					{...(selectedWeightType === 'weight_by_total' ? SELECTED_STYLE : null)}
					onClick={() => setSelectedWeightType('weight_by_total')}
				>
					Total)
				</text>
			</div>
		</Tooltip>
	);
}

const getDimensionsUnitLabel = () => (
	<div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
		<text style={{ marginRight: '2px' }}>Unit</text>
		<Tooltip
			placement="right"
			animation="shift-away"
			content={(
				<div style={{ fontSize: '12px' }}>
					{' '}
					For rate calculation, volume will be converted to CBM
					{' '}
				</div>
			)}
		>
			<div className={styles.flex}>
				<IcMInfo />
			</div>
		</Tooltip>
	</div>
);

const getControls = ({
	selectedWeightType = '',
	setSelectedWeightType = () => {},
}) => {
	const arr = [
		{
			name    : 'packing_type',
			label   : 'PKG Type',
			type    : 'select',
			value   : 'box',
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
			style: {
				// width : '100px',
				menu: {
					left   : 0,
					zIndex : 999999999999999,
				},
			},
			rules: {
				required: 'required',
			},
		},
		{
			name        : 'quantity',
			label       : 'Units',
			type        : 'number',
			value       : 1,
			placeholder : '...',
			// style       : { width: '90px' },
			rules       : {
				min      : 1,
				required : 'required',
			},
		},
		{
			name        : 'length',
			label       : 'Length',
			type        : 'number',
			value       : 1,
			// style       : { width: '80px' },
			placeholder : '...',
			rules       : {
				min      : 0.01,
				required : 'required',
			},
		},
		{
			name        : 'width',
			label       : 'Width',
			type        : 'number',
			value       : 1,
			// style       : { width: '80px' },
			placeholder : '...',
			rules       : {
				min      : 0.01,
				required : 'required',
			},
		},
		{
			name        : 'height',
			label       : 'Height',
			type        : 'number',
			value       : 1,
			// style       : { width: '80px' },
			placeholder : '...',
			rules       : {
				min      : 0.01,
				required : 'required',
			},
		},
		{
			name    : 'dimensions_unit',
			label   : getDimensionsUnitLabel(),
			type    : 'select',
			value   : 'cm',
			// style   : { width: '80px' },
			options : [
				{
					label : 'CM',
					value : 'cm',
				},
				{
					label : 'IN',
					value : 'inch',
				},
			],
			rules: {
				required: 'required',
			},
		},
		{
			name        : 'weight',
			label       : getWeightLabel(),
			type        : 'number',
			value       : 1,
			// style       : { width: '80px' },
			placeholder : '...',
			rules       : {
				min      : 0.001,
				required : 'required',
			},
		},
		{
			name  : 'weight_unit',
			// style : { width: '130px' },
			label : (
				<GetWeightUnitLabel
					selectedWeightType={selectedWeightType}
					setSelectedWeightType={setSelectedWeightType}
				/>
			),
			type    : 'select',
			options : WEIGHT_UNIT_MAPPING[selectedWeightType],
			rules   : {
				required: 'required',
			},
		},
		{
			name    : 'handling_type',
			label   : '',
			type    : 'checkboxGroup',
			options : [{ value: 'stackable', label: 'Stackable' }],
		},
	];

	const controls = [
		{
			name        : 'packages',
			type        : 'fieldArray',
			showButtons : true,
			buttonText  : 'Add Package',
			controls    : arr,
			rules       : {
				required: 'required',
			},
		},
	];

	return controls;
};

export default getControls;
