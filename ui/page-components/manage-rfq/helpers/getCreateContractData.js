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

	const containerSearchParam =		(searchParams || {})[`${search_type}_services_attributes`] || [];

	const commoditieData = (containerSearchParam || []).map((item) => {
		const itemData = getInfo(item || {});
		const mainDettails = [];
		itemData.forEach((val) => {
			if (reqCommodities.includes(val.value)) {
				mainDettails.push(val.valueText);
			}
		});
		return mainDettails;
	});

	const reqCount = containerSearchParam?.[0]?.[getAttribute[search_type]];

	return { commoditieData, reqCount };
};

const getCreateContractData = ({ selectedData, cardIds }) => {
	const result = [];
	Object.keys(selectedData).forEach((key) => {
		const spotSearch = selectedData[key]?.data || {};
		const { detail, search_params } = spotSearch || {};
		const { commoditieData, reqCount } = getCommodities(search_params);

		const data = {
			id                  : spotSearch.id,
			rfq_id              : spotSearch.rfq_id,
			search_id           : spotSearch.search_id,
			origin_port         : detail?.origin_port || detail?.origin_airport,
			destination_port    : detail?.destination_port || detail?.origin_airport,
			origin_airport      : detail?.origin_airport,
			destination_airport : detail?.destination_airport,
			card                : cardIds[key]?.split('/')[0],
			commodities         : commoditieData,
			service_type        : detail?.service_type,
			reqCount,
			service_details     : detail?.service_details,
			rate                : selectedData[key]?.rate,
		};
		result.push(data);
	});

	return result;
};
export default getCreateContractData;
