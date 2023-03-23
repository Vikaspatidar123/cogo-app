const ShipmentPlanControls = ({ validity_start, validity_end }) => [
	{
		name               : 'create_plan',
		type               : 'fieldArray',
		initialCount       : 1,
		noDeleteButtonTill : 1,
		showAddIcon        : false,
		value              : [
			{
				max_count  : '',
				date_range : '',
			},
		],
		controls: [
			{
				name      : 'max_count',
				type      : 'number',
				errorName : ' ',
				className : 'primary sm',
				rules     : {
					required : 'This is required',
					min      : 1,
					max      : 5000,
				},
				span: 4,
			},
			{
				name         : 'date_range',
				pickerType   : 'range',
				type         : 'datepicker',
				errorName    : ' ',
				minDate      : validity_start,
				maxDate      : validity_end,
				showOptional : false,
				className    : 'primary md',
				span         : 4,
				rules        : { required: 'This is required' },
			},
		],
	},
];
export default ShipmentPlanControls;
