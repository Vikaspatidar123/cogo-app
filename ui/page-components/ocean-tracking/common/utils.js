import { FILTER_KEYS, FILTER_KEY_TO_ID } from './constants';

const prepareFilters = (filters, filters_data) => {
	const finalFilters = {};
	Object.keys(filters).forEach((key) => {
		if (key === 'shipping_line_id') {
			finalFilters[FILTER_KEY_TO_ID[key]] = filters[key];
		} else if (
			key === FILTER_KEYS.SHIPPER
            || key === FILTER_KEYS.CONSIGNEE
		) {
			finalFilters[FILTER_KEY_TO_ID[key]] = [];
			const pocKeys = filters[key];
			const pocDetailsList = filters_data.poc_details || [];
			pocKeys.forEach((pocKey) => {
				const saasSubscriptionIds = pocDetailsList
					.filter((item) => item.saas_shipment_poc_id === pocKey)
					.map((item) => item.saas_container_subscription_id);

				finalFilters[FILTER_KEY_TO_ID[key]] = finalFilters[FILTER_KEY_TO_ID[key]].concat(
					saasSubscriptionIds,
				);
			});
		} else if (key === FILTER_KEYS.BOOKED_COGOPORT) {
			if (!filters[key]) return;

			finalFilters[FILTER_KEY_TO_ID[key]] = [];

			const pocDetailsList = filters_data.booked_with_cogoport || [];
			const saasSubscriptionIds = pocDetailsList.map(
				(item) => item.saas_container_subscription_id,
			);

			finalFilters[FILTER_KEY_TO_ID[key]] = finalFilters[FILTER_KEY_TO_ID[key]].concat(saasSubscriptionIds);
		}

		finalFilters.id = filters[key];
	});

	return finalFilters;
};

export { prepareFilters };
