const framesConfig = {
	publicKey : `${process.env.NEXT_PUBLIC_CHECKOUT_PUBLIC_KEY}`,
	style     : {
		base: {
			color    : 'black',
			fontSize : '18px',
			height   : '30px',
		},
		autofill: {
			backgroundColor: 'yellow',
		},
		hover: {
			color: 'blue',
		},
		focus: {
			color: 'blue',
		},
		valid: {
			color: 'green',
		},
		invalid: {
			color: 'red',
		},
		placeholder: {
			base: {
				color: 'gray',
			},
		},
	},
	localization: {
		cardNumberPlaceholder  : 'Card number',
		expiryMonthPlaceholder : 'MM',
		expiryYearPlaceholder  : 'YY',
		cvvPlaceholder         : 'CVV',
	},
	acceptedPaymentMethods: [
		'Visa',
		'Maestro',
		'Mastercard',
		'American Express',
		'Diners Club',
		'Discover',
		'JCB',
		'Mada',
	],
};

export default framesConfig;
