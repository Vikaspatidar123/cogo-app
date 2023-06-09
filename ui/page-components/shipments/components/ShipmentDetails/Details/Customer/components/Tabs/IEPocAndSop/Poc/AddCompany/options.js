export const shipperOptions = (source = '') => {
	const options = [
		{
			value : 'same_as_booking_party',
			label : 'Same as Booking Party',
		},
		{
			value : 'booking_party',
			label : 'Self',
		},
		{
			value : 'trade_partner',
			label : 'Select Trade Partner',
		},
		{
			value : 'create_new_company',
			label : 'Create New Company',
		},
		{
			value : 'historical',
			label : 'Historical',
		},
	];
	if (source === 'task') {
		options.shift();
	}
	return options;
};

export const consigneeOptions = [
	{
		value : 'booking_party',
		label : 'Self',
	},
	{
		value : 'trade_partner',
		label : 'Select Trade Partner',
	},
	{
		value : 'create_new_company',
		label : 'Create New Company',
	},
	{
		value : 'historical',
		label : 'Historical',
	},
];

export const options = [
	{
		value : 'trade_partner',
		label : 'Select Trade Partner',
	},
	{
		value : 'create_new_company',
		label : 'Create New Company',
	},
];

export const bookingPartyOptions = [
	{
		value : 'booking_party',
		label : 'Self',
	},
	{
		value : 'trade_partner',
		label : 'Select Trade Partner',
	},
];

export const poc_options = [
	{
		label : 'Commercial Decision Maker',
		value : 'commercial_decision_maker_poc',
	},
	{ label: 'Operations', value: 'i_work_in_operations' },
	{ label: 'Off Field Operations', value: 'off_field_operations_poc' },
	{ label: 'Logisctics Operation', value: 'logistics_operations_poc' },
	{ label: 'Payment Poc', value: 'payments_poc' },
	{ label: 'BL Airway Bill', value: 'bl/airway_bill_poc' },
	{ label: 'Escalation', value: 'escalation_poc' },
	{ label: 'Owner', value: 'i_am_owner' },
	{ label: 'Finance Head', value: 'i_am_finance_head' },
	{ label: 'Finance', value: 'i_work_in_finance' },
	{ label: 'Procurement', value: 'i_work_in_procurement' },
	{ label: 'Marketing and Sales', value: 'i_work_in_marketing_and_sales' },
	{ label: 'Logistics Manager', value: 'i_am_logistics_manager' },
	{ label: 'Other', value: 'other' },
	{ label: 'Operation Manager', value: 'i_am_operation_manager' },
	{ label: 'Finance Manager', value: 'i_am_finance_manager' },
	{ label: 'Signing Authority', value: 'i_am_signing_authority' },
];
