import { Toggle } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';

import styles from './styles.module.css';

const getToggleBuutton = (toggleState, setToggleState) => (
	<div className={styles.toggle_container}>
		<Toggle
			offLabel="Import"
			onLabel="Export"
			value={toggleState}
			onChange={(e) => setToggleState(e.target.value ? 'import' : 'export')}
		/>
	</div>
);

const SERVICE_OPTIONS = [
	{
		label : 'Express',
		value : 'express',
	},
	{
		label : 'Normal',
		value : 'normal',
	},
];

const controls = ({
	cargo_clearance_date,
	tomorrow,
	OPTIONS,
	commoditySubtypeOptions,
	setToggleState,
	toggleState,
	options,
	goodsDetail,
	serviceType,
}) => [
	{
		name                  : 'cargo_date',
		label                 : 'Cargo Ready Date',
		type                  : 'datepicker',
		style                 : { width: '200px' },
		span                  : 6,
		isPreviousDaysAllowed : false,
		value                 : cargo_clearance_date || tomorrow,
		rules                 : { required: 'This is required' },
	},
	{
		name        : 'incoterms',
		label       : 'Incoterm (Import/Export)',
		type        : 'select',
		style       : { width: '200px' },
		placeholder : 'Add Incoterms',
		span        : 6,
		disabled    : isEmpty(options),
		options     : [
			{
				label: getToggleBuutton(toggleState, setToggleState),
			},
			...options,
		],
		value : goodsDetail?.incoterms,
		style : {
			menu: {
				right        : 0,
				background   : 'white',
				boxShadow    : '0 4px 80px rgba(0, 0, 0, 0.15)',
				borderRadius : 10,
				zIndex       : 99999,
				width        : 244,
			},
		},
		rules: { required: true },
	},

	{
		name    : 'service_name',
		label   : 'Service Name',
		value   : goodsDetail.service_name,
		style   : { width: '200px' },
		type    : 'select',
		span    : 6,
		options : SERVICE_OPTIONS,
		rules   : { required: true },
	},

	{
		name    : 'commodity_type',
		label   : 'Commodity Type',
		style   : { width: '200px' },
		value   : goodsDetail?.commodity_type || goodsDetail?.values?.commodity_type,
		type    : 'select',
		span    : 6,
		options : OPTIONS,
		rules   : { required: true },
	},
	{
		name  : 'commodity_subtype',
		label : 'Commodity Subtype',
		value:
      goodsDetail?.values?.commodity_subtype
      || (serviceType === 'air_international' ? 'all' : 'others'),
		type    : 'select',
		span    : 6,
		options : commoditySubtypeOptions,
		style   : {
			width : '200px',
			menu  : {
				right        : 0,
				background   : 'white',
				boxShadow    : '0 4px 80px rgba(0, 0, 0, 0.15)',
				borderRadius : 10,
				zIndex       : 99999,
			},
		},
		rules: { required: true },
	},
	{
		name     : 'dry_ice_required',
		type     : 'checkbox',
		style    : { width: '200px' },
		span     : 12,
		label    : 'Dry Ice required',
		// options  : [{ value: true }],
		value    : goodsDetail?.dry_ice_required,
		multiple : true,
	},
];

export default controls;
