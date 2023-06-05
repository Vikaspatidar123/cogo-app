import { createContext } from 'react';

const CheckoutContext = createContext([
	{
		scope           : 'app',
		primaryService  : {},
		detail          : {},
		services        : [],
		rate            : {},
		conversions     : {},
		checkout_id     : '',
		refetchCheckout : () => {},
		firstLoading    : false,
		organization    : {},
		getCheckout     : {},
		invoice         : {},
	},
]);
export default CheckoutContext;
