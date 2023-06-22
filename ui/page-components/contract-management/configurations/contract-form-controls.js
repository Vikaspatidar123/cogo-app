const ShipmentPlanControls = ({ validity_start, validity_end }) => [
	{
		name               : 'create_plan',
		type               : 'fieldArray',
		initialCount       : 1,
		noDeleteButtonTill : 1,
		showAddIcon        : false,
		controls           : [
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
				type         : 'daterangepicker',
				errorName    : ' ',
				minDate      : validity_start,
				maxDate      : validity_end,
				showOptional : false,
				span         : 4,
				rules        : { required: 'This is required' },
			},
		],
	},
];
export default ShipmentPlanControls;
