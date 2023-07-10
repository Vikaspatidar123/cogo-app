import { addDays } from '@cogoport/utils';

import CONTAINER_SIZES from '@/ui/commons/constants/CONTAINER_SIZES';

const fclControls = ({ contractValidity, departureDate, fclArray, attributes }) => {
	const { contractEndDate } = contractValidity || {};

	return [
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
		{
			name        : 'shipping_line_id',
			type        : 'async_select',
			asyncKey    : 'shipping-lines',
			initialCall : true,
			caret       : true,
			inlineLabel : 'Shipping lines',
			placeholder : 'Select shipping line',
			span        : 6,
			className   : 'primary lg',
			rules       : { required: 'Shipping line required' },
		},
		{
			label           : '',
			name            : 'inco_term',
			type            : 'inco-terms-select',
			selectType      : 'chips',
			style           : { control: { width: '200px' } },
			rules           : { required: 'Inco-term is required' },
			activeTradeType : 'import',
			value           : fclArray[0]?.inco_term,
			disabled        : true,
		},
		{
			name        : 'attributes',
			inlineLabel : 'Container',
			type        : 'fieldArray',
			showButtons : false,
			value       : attributes,
			controls    : [
				{
					label         : 'Container Type',
					name          : 'container_type_commodity',
					type          : 'container_type-commodity',
					span          : 6,
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
					span        : 6,
					options     : CONTAINER_SIZES,
					rules       : { required: 'Containers size is required' },
					disabled    : true,
				},
				{
					inlineLabel : 'Container Count',
					name        : 'containers_count',
					type        : 'number',
					span        : 6,
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
					span        : 6,
					rules       : { min: 0.1, max: 30, required: 'Cargo Weight is required' },
				},
			],
		},
	];
};

export default fclControls;
