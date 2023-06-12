import sopConditions from '@/ui/page-components/shipments/helpers/sop-conditions-options';

const controls = ({ primary_service, trade_partners_details }) => [
	{
		type       : 'fieldArray',
		name       : 'instruction_items',
		subType    : 'edit_items',
		showHeader : true,
		buttonText : 'Add',
		value      : [{ instruction: '', file: null }],
		controls   : [
			{
				type        : 'textarea',
				name        : 'instruction',
				label       : 'Instruction',
				span        : 8,
				errorName   : 'Instruction',
				placeholder : 'Start typing to add SOP ',
				className   : 'primary sm',
				size        : 'md',
				rows        : 1,
				resize      : true,
			},
			{
				type            : 'file',
				name            : 'file',
				multiple        : true,
				onlyURLOnChange : true,
				placeholder     : '',
				uploadText      : 'Attach',
				accept:
					'image/*,.pdf,.doc,.docx,application/msword,'
					+ 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
				uploadType : 'aws',
				span       : 4,
			},
		],
	},
	{
		name        : 'heading',
		errorName   : 'Heading',
		type        : 'input',
		placeholder : 'Enter Heading',
		span        : '12',
		rules       : {
			required: 'Required',
		},
	},
	{
		name        : 'conditions',
		type        : 'select',
		theme       : 'admin',
		multiple    : true,
		placeholder : 'Select a Condition',
		options     : sopConditions(primary_service, trade_partners_details),
	},
	{
		name    : 'soptype',
		type    : 'radio',
		theme   : 'admin',
		value   : 'shipment',
		options : [
			{ label: 'For This Shipment', value: 'shipment' },
			{ label: 'For Booking Party', value: 'for_booking_party' },
		],
	},
];

export default controls;
