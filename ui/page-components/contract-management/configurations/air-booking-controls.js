import { addDays } from '@cogoport/utils';

const airControls = (contractValidity, departureDate) => {
	const { contractEndDate } = contractValidity || {};

	return [
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
			name        : 'volume',
			inlineLabel : 'Volume',
			placeholder : 'Volume',
			type        : 'number',
			span        : 6,
			value       : 1,
			rules       : { required: 'Required', min: 0 },
		},
		{
			name           : 'weight',
			inlineLabel    : 'Weight',
			value          : 1,
			type           : 'number',
			defaultOptions : true,
			caret          : true,
			span           : 6,
			rules          : { required: 'Required', min: 0 },
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
	];
};

export default airControls;
