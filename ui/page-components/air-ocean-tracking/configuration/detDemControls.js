const detDemControls = [
	{
		name   : 'origin_detention',
		label  : 'At Origin',
		type   : 'number',
		// placeholder : 'Enter number of days here',
		suffix : 'free detention days',
		rules  : {
			required : 'Please enter origin detention',
			maxValue : {
				value   : 30,
				message : 'Entered number cannot greater that 30',
			},
		},
	},
	{
		name   : 'destination_detention',
		label  : 'At Destination',
		type   : 'number',
		// placeholder : 'Enter number of days here',
		suffix : 'free detention days',
		rules  : {
			required : 'Please enter destination detention',
			maxValue : {
				value   : 30,
				message : 'Entered number cannot greater that 30',
			},
		},
	},
	{
		name   : 'destination_demurrage',
		type   : 'number',
		// placeholder : 'Enter number of days here',
		suffix : 'free demurrage days',
		rules  : {
			required : 'Please enter destination demurrage',
			maxValue : {
				value   : 30,
				message : 'Entered number cannot greater that 30',
			},
		},
	},
];

export default detDemControls;
