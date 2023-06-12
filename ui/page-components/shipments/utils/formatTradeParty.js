export const getDetails = ({ selectedAddress = '', list = {} }) => {
	const details = {};
	Object.keys(list).forEach((key) => {
		(list[key] || []).forEach((address) => {
			if (selectedAddress === address.address) {
				details.business_name = key;
				details.pincode = address.pincode;
				details.poc_data = [...address.organization_pocs];
			}
		});
	});
	return details;
};

export const setFormatedTradeParties = ({
	list = [],
	setTradeParties = {},
}) => {
	const address_details = {};
	list.forEach((item) => {
		if ((item.billing_addresses || []).length) {
			address_details[item.legal_business_name] = [
				...(address_details[item?.legal_business_name] || []),
				...item.billing_addresses,
			];
		}
		if ((item.other_addresses || []).length) {
			address_details[item.legal_business_name] = [
				...(address_details[item?.legal_business_name] || []),
				...item.other_addresses,
			];
		}
	});

	let address_list = [];
	Object.keys(address_details).forEach((key) => {
		const addresses = (address_details[key] || []).map((address) => ({
			label : address?.address,
			value : address?.address,
		}));
		address_list = [...address_list, ...addresses];
	});
	setTradeParties({ address_details, address_list });
};
