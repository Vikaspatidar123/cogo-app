import { addDays } from '@cogoport/utils';

import CONTAINER_SIZES from '@/ui/commons/constants/CONTAINER_SIZES';

const fclControls = ({ contractValidity, departureDate, primaryServicesDetailsArray }) => {
	const { contractEndDate } = contractValidity || {};

	const attributes = primaryServicesDetailsArray.map((item) => ({
		container_size           : item?.container_size,
		commodity                : item?.commodity,
		container_type_commodity : {
			container_type : item?.container_type,
			commodity      : item?.commodity,
		},
		container_type             : item?.container_type,
		containers_count           : item?.containers_count,
		cargo_weight_per_container : item?.cargo_weight_per_container,
		primary_service_id         : item?.primary_service_id,
	}));

	const fields = [
		{
			inlineLabel : 'Departure',
			name        : 'departure',
			type        : 'datepicker',
			placeholder : 'Select Departure Date',
			span        : 4,
			rules       : { required: 'Required' },
			minDate     : addDays(new Date(), 1),
			maxDate     : contractEndDate,
		},
		{
			name        : 'arrival',
			inlineLabel : 'Arrival',
			placeholder : 'Select Arrival Date',
			type        : 'datepicker',
			span        : 4,
			rules       : { required: 'Required' },
			disabled    : !departureDate,
			minDate     : departureDate,
		},
		{
			name        : 'shipping_line_id',
			type        : 'async_select',
			asyncKey    : 'shipping-lines',
			initialCall : true,
			caret       : true,
			inlineLabel : 'Shipping lines',
			placeholder : 'Select shipping line',
			span        : 4,
			rules       : { required: 'Shipping line required' },
		},
		{
			name        : 'trucks_count',
			inlineLabel : 'Trucks Count',
			type        : 'number',
			placeholder : 'Enter trucks count',
			span        : 4,
			rules       : { required: 'Required', min: 0, max: 100 },
		},
		{
			label           : '',
			name            : 'inco_term',
			type            : 'inco-terms-select',
			selectType      : 'chips',
			style           : { control: { width: '200px' } },
			rules           : { required: 'Inco-term is required' },
			activeTradeType : 'import',
			disabled        : true,
			span            : 4,

		},
		{
			name             : 'attributes',
			inlineLabel      : 'Container',
			type             : 'fieldArray',
			showButtons      : false,
			showDivider      : true,
			showDeleteAlways : true,
			controls         : [
				{
					label         : 'Container Type',
					name          : 'container_type_commodity',
					type          : 'container_type-commodity',
					span          : 2.8,
					controlFields : {
						container_type: {
							label          : 'Container Type',
							name           : 'container_type',
							Type           : 'chips',
							optionsListKey : 'container-types',
							disabled       : true,
						},
					},
					rules       : { required: 'Containers type & commodity is required' },
					disabled    : true,
					showOptions : false,
				},
				{
					name        : 'container_size',
					inlineLabel : 'Container Size',
					type        : 'chips',
					span        : 3,
					options     : CONTAINER_SIZES,
					rules       : { required: 'Containers size is required' },
					disabled    : true,
				},
				{
					inlineLabel : 'Container Count',
					name        : 'containers_count',
					type        : 'number',
					span        : 2,
					value       : 1,
					rules       : {
						min      : 1,
						max      : 10000,
						required : 'Containers count is required',
					},
				},
				{
					inlineLabel : 'Cargo Weight per Container',
					subLabel    : '(in metric tonnes)',
					name        : 'cargo_weight_per_container',
					placeholder : 'between 0 to 30 metric tonnes',
					type        : 'number',
					span        : 2.9,
					rules       : { min: 0.1, max: 30, required: 'Cargo Weight is required' },
				},
				{
					name  : 'primary_service_id',
					type  : 'hidden',
					style : { display: 'none' },
				},
			],
		},
	];

	const defaultValues = {
		inco_term: primaryServicesDetailsArray[0]?.inco_term,
		attributes,
	};

	return {
		defaultValues, fields,
	};
};

export default fclControls;
