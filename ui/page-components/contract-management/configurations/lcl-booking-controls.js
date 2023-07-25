import { addDays } from '@cogoport/utils';

const lclControls = ({ contractValidity, departureDate, primaryServicesDetailsArray = [] }) => {
	const { primary_service_id = '' } = primaryServicesDetailsArray?.[0] || {};

	const { contractEndDate } = contractValidity || {};
	const fields = [
		{
			name        : 'packages_count',
			inlineLabel : 'Packages Count',
			type        : 'number',
			value       : 1,
			className   : 'primary lg',
			placeholder : 'Enter packages count',
			span        : 6,
			rules       : { required: 'Packages count required', min: 1 },
		},
		{
			inlineLabel : 'Weight',
			placeholder : 'Weight',
			name        : 'weight',
			type        : 'number',
			span        : 6,
			value       : 1,
			rules       : { required: 'Required', min: 0 },
		},
		{
			name        : 'volume',
			inlineLabel : 'Volume',
			type        : 'number',
			placeholder : 'Volume',
			span        : 6,
			rules       : { required: 'Required', min: 0 },
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
			inlineLabel : 'Departure',
			name        : 'departure',
			type        : 'datepicker',
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
			span        : 6,
			rules       : { required: 'Required' },
			disabled    : !departureDate,
			minDate     : departureDate,
		},
		{
			name  : 'primary_service_id',
			value : primary_service_id,
			type  : 'hidden',
			style : { display: 'none' },
			span  : 0.1,
		},
	];

	const defaultValues = {
		packages_count : 1,
		weight         : 1,
		primary_service_id,
	};

	return { defaultValues, fields };
};

export default lclControls;
