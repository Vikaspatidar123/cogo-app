import { addDays } from '@cogoport/utils';

const airControls = ({ contractValidity, departureDate, primaryServicesDetailsArray = [] }) => {
	const { contractEndDate } = contractValidity || {};
	const { primary_service_id = '' } = primaryServicesDetailsArray?.[0] || {};

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
		volume         : 1,
		weight         : 1,
		primary_service_id,
	};

	return {
		fields, defaultValues,
	};
};

export default airControls;
