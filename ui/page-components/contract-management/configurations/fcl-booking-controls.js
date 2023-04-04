import { addDays } from '@cogoport/utils';

const fclControls = (contractValidity, departureDate) => {
	const { contractEndDate } = contractValidity || {};
	return [
		{
			name        : 'containers_count',
			inlineLabel : 'Container Count',
			placeholder : 'Containers count',
			type        : 'number',
			className   : 'primary lg',
			span        : 6,
			value       : 1,
			rules       : { required: 'Required', min: 1, max: 10000 },
		},
		{
			name        : 'trucks_count',
			inlineLabel : 'Trucks Count',
			type        : 'number',
			className   : 'primary lg',
			placeholder : 'Enter trucks count',
			span        : 6,
			rules       : { required: 'Truck count required', min: 1 },
		},
		{
			name        : 'shipping_line_id',
			type        : 'async_select',
			asyncKey    : 'shipping_line',
			initialCall : true,
			caret       : true,
			inlineLabel : 'Shipping lines',
			placeholder : 'Select shipping line',
			span        : 6,
			className   : 'primary lg',
			rules       : { required: 'Shipping line required' },
		},
		{
			inlineLabel : 'Cargo Weight per Container(in metric tons)',
			placeholder : 'Cargo Wt per Container',
			name        : 'cargo_weight_per_container',
			type        : 'number',
			span        : 6,
			className   : 'primary lg',
			value       : 18,
			rules       : { required: 'Required' },
		},
		{
			inlineLabel : 'Departure',
			name        : 'departure',
			type        : 'datepicker',
			className   : 'primary lg',
			placeholder : 'Select Departure Date',
			span        : 6,
			rules       : { required: 'Required' },
			minDate     : addDays(new Date(), 1),
			maxDate     : contractEndDate,
		},
		{
			name        : 'arrival',
			inlineLabel : 'Arrival',
			placeholder : 'Select Arrival Date',
			type        : 'datepicker',
			className   : 'primary lg',
			span        : 6,
			rules       : { required: 'Required' },
			disabled    : !departureDate,
			minDate     : departureDate,
		},
	];
};

export default fclControls;
