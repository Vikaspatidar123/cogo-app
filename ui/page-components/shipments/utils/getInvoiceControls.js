const getInvoiceControls = (selectedCharges, invoiceCurrency = 'USD') => {
	const curriencies = [];
	selectedCharges.forEach((item) => {
		if (
			item.currency &&
			item.currency !== invoiceCurrency &&
			!curriencies.includes(item.currency)
		) {
			curriencies.push(item.currency);
		}
	});

	const conversionControls = curriencies.map((item) => ({
		name: item,
		label: `Currency conversion rate for ${item} to ${invoiceCurrency}`,
		type: 'number',
		placeholder: 'Type here...',
		span: 4,
		validations: [
			{
				type: 'required',
				message: `Currency conversion rate for ${item} to ${invoiceCurrency} required`,
			},
		],
	}));
	return conversionControls;
};

export default getInvoiceControls;
