import createQuotePayload from './createQuotePayload';

const quoteSubmitHandler = ({ submitForm, postQuotation, exchangeRate }) => {
	const createQuoteHandler = () => {
		const data = submitForm();
		if (data) {
			const {
				expiryDate,
				products,
				sellerAddressDetails,
				buyerAddressDetails,
				shipmentDetails,
				additionalChargesList,
				otherDetails,
			} = createQuotePayload({ data, exchangeRate });

			postQuotation({
				expiryDate,
				products,
				sellerAddressDetails,
				buyerAddressDetails,
				shipmentDetails,
				additionalChargesList,
				otherDetails,
			});
		}
	};
	return { createQuoteHandler };
};

export default quoteSubmitHandler;
