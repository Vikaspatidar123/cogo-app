import GLOBAL_CONSTANTS from '@cogo/globalization/constants/globals.json';
import isEmpty from '@cogo/utils/isEmpty';
import { get } from '@cogoport/front/utils';

const getErrorMsg = (value) => {
	if (value) return 'Cargo value cannot be less than zero';
	return 'Cargo value is required';
};

const controls = [
	{
		name                  : 'cargo_readiness_date',
		label                 : 'Cargo Ready Date',
		type                  : 'datepicker',
		isPreviousDaysAllowed : false,
		rules                 : { required: true },
		span                  : 3,
	},
	{
		name     : 'cargo_value',
		label    : 'cargo value',
		type     : 'price-select',
		priceKey : 'value',
		rules    : {
			required : true,
			validate : (value) => (!value.value || value.value < 0 ? getErrorMsg(value.value) : undefined),
		},
		currencyDisabled : true,
		span             : 3,
	},
	{
		name    : 'container_load_type',
		label   : 'Container Type',
		type    : 'select',
		options : [{ label: 'Container Rake', value: 'container_rake' }],
		value   : 'container_rake',
		rules   : { required: true },
		span    : 2.5,
	},
	{
		name    : 'container_load_sub_type',
		label   : 'Container Sub-Type',
		type    : 'select',
		options : [
			{ label: 'Full Rake', value: 'full_rake' },
			{ label: 'Piece Mile', value: 'piece_mile' },
		],
		rules : { required: true },
		span  : 3,
	},
	{
		name  : 'cargo_description',
		label : 'cargo description',
		type  : 'textarea',
		rows  : 2,
		span  : 3,
	},
];

const getControls = ({ values }) => controls.map((control) => {
	if (control.name === 'container_load_type') {
		return {
			...control,
			value: 'container_rake',
		};
	}

	if (isEmpty(values) && control.name === 'cargo_value') {
		return {
			...control,
			value: { currency: GLOBAL_CONSTANTS.currency_code.INR, value: '' },
		};
	}

	return {
		...control,
		value: get(values, control.name) || '',
	};
});

export default getControls;
