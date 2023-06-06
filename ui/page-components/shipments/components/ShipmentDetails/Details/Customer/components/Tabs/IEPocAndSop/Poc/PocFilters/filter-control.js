import { startCase } from '@cogoport/utils';

const WORK_SCOPES = [
	'commercial_decision_maker_poc',
	'off_field_operations_poc',
	'logistics_operations_poc',
	'payments_poc',
	'bl/airway_bill_poc',
	'escalation_poc',
	'i_am_owner',
];

const work_scope_options = WORK_SCOPES.map((item) => ({
	label : startCase(item?.replace(/_/g, ' ')),
	value : item,
}));

const filter_controls = (filter_options) => [
	{
		name        : 'trade_partner',
		type        : 'select',
		span        : 12,
		options     : filter_options,
		isClearable : true,
		placeholder : 'Trade Partner',
	},
	{
		name        : 'designation',
		type        : 'select',
		span        : 12,
		placeholder : 'Choose a designation',
		options     : work_scope_options,
		multiple    : true,
	},
	{
		type     : 'async_select',
		asyncKey : 'locations',
		params   : {
			filters: {
				type: ['city'],
			},
		},
		caret          : true,
		name           : 'origin_location_id',
		isClearable    : true,
		showOriginIcon : true,
		placeholder    : 'Search City',
		className      : 'primary md',
		span           : 12,
	},
];

export default filter_controls;
