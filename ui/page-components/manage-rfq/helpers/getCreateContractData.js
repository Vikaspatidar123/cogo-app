import getInfo from './getInfo';

const getAttribute = {
	fcl_freight : 'containers_count',
	lcl_freight : 'packages_count',
	air_freight : 'packages_count',
};

const reqCommodities = [
	'container_size',
	'containers_count',
	'container_type',
	'commodity',
	'inco_term',
];

const getCommodities = (searchParams) => {
	const { search_type } = searchParams || {};

	const containerSearchParam = (searchParams || {})[`${search_type}_services_attributes`] || [];

	const commoditieData = (containerSearchParam || []).map((item) => {
		const itemData = getInfo(item || {});
		return itemData
			.filter((data) => reqCommodities.includes(data?.value))
			.map((value) => value?.valueText);
	});

	const reqCount = containerSearchParam?.[0]?.[getAttribute[search_type]];

	return { commoditieData, reqCount };
};

const getCreateContractData = ({ selectedData, cardIds }) => {
	const result = [];
	Object.entries(selectedData).forEach(([key, value]) => {
		if (!value) {
			return;
		}

		const {
			mandatory_operator_ids,
			excluded_operator_ids,
			preferred_operator_ids,
		} = value;

		const spotSearch = value?.data || {};
		const { detail, search_params, id = '', rfq_id = '', search_id = '' } = spotSearch || {};
		const { commoditieData, reqCount } = getCommodities(search_params);

		const {
			origin_port = {},
			destination_port = {},
			origin_airport = {},
			service_type = '',
			service_details = '',
			destination_airport = {},
		} = detail || {};

		const idData = value?.is_rfq_rate_card
			? { rfq_rate_card_id: value?.rfq_rate_card_id }
			: { selected_rate_card_id: value?.spot_search_rate_card_id };

		const data = {
			id,
			rfq_id,
			search_id,
			origin_port,
			destination_port,
			origin_airport,
			destination_airport,
			card        : cardIds[key]?.split('/')[0],
			commodities : commoditieData,
			service_type,
			reqCount,
			service_details,
			rate        : value?.rate,
			mandatory_operator_ids,
			excluded_operator_ids,
			preferred_operator_ids,
			...idData,
		};
		result.push(data);
	});
	return result;
};
export default getCreateContractData;
