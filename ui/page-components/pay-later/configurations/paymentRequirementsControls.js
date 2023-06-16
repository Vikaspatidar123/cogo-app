export const paymentRequirementsControl = [
	{
		label         : 'Payment Days',
		name          : 'credit_days',
		type          : 'number',
		placeholder   : 'Type here...',
		section       : 'requirements',
		isShowStepper : false,
		rules         : {
			required : true,
			max      : {
				value   : 90,
				message : 'Should be less than 90',
			},
		},
	},
	{
		label         : 'Payment Requirements',
		name          : 'credit_amount',
		type          : 'number',
		placeholder   : 'Type here...',
		section       : 'requirements',
		isShowStepper : false,
		rules         : {
			required : true,
			max      : {
				value   : 30000000,
				message : 'Should be less than 3cr',
			},
		},
	},
];
