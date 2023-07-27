const ShipmentPlanControls = ({
	validity_start,
	validity_end,
	containerDetailsOptions = [],
}) => [
	{
		name               : 'create_plan',
		type               : 'fieldArray',
		initialCount       : 1,
		noDeleteButtonTill : 1,
		showAddIcon        : false,
		value              : [
			{
				date_range      : '',
				sub_create_plan : [
					{
						vessel_select:
								containerDetailsOptions.length === '1'
									? containerDetailsOptions[0]?.value
									: '',
						max_count: 0,
					},
				],
			},
		],
		controls: [
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
			{
				name           : 'sub_create_plan',
				type           : 'fieldArray',
				initialCount   : 1,
				showSubAddIcon : true,
				span           : 12,
				value          : [
					{
						vessel_select:
								containerDetailsOptions.length === '1'
									? containerDetailsOptions[0]?.value
									: '',
						max_count: 0,
					},
				],
				controls: [
					{
						name      : 'vessel_select',
						type      : 'select',
						errorName : ' ',
						className : 'primary sm',
						span      : 5.5,
						options   : containerDetailsOptions,
						...(containerDetailsOptions.length === '1'
							? { value: containerDetailsOptions[0]?.value }
							: {}),

					},
					{
						name      : 'max_count',
						type      : 'number',
						errorName : ' ',
						className : 'primary sm',
						span      : 5,
						rules     : {
							required : 'This is required',
							min      : 1,
							max      : 5000,
						},
					},
				],
			},
		],
	},
];

export default ShipmentPlanControls;
