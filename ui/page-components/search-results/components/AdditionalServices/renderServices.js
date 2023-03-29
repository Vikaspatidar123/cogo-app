import getLocationInfo from '../AdditionalCards/MultiService/Service/locations-search';

const tp = ['ftl_freight', 'ltl_freight', 'trailer_freight'];

const renderServices = (addedServices = [], servicesToAdd = [], data) => {
	const service_key = data?.checkout_id ? 'service_type' : 'search_type';
	const { origin, destination } = getLocationInfo(service_key, data);

	const newServicesToAdd = servicesToAdd.filter((item) => {
		const tradeType = item.includes('import') ? 'import' : 'export';
		const items = item.includes('import')
			? item.split('import_')
			: item.split('export_');
		const service = items[1];
		const isServiceAdded =			addedServices.filter(
			(serviceItem) => serviceItem.trade_type === tradeType
					&& (serviceItem.service_type === service
						|| (service === 'transportation'
							&& tp.includes(serviceItem.service_type))),
		).length > 0;

		if (service === 'haulage_freight') {
			if (
				tradeType === 'import'
				&& (data?.search_type === 'fcl_customs'
					|| data?.search_type === 'fcl_freight_local')
			) {
				return origin?.is_icd && !isServiceAdded;
			}
			if (tradeType === 'export') {
				return origin?.is_icd && !isServiceAdded;
			}
			if (tradeType === 'import') {
				return destination?.is_icd && !isServiceAdded;
			}
			return !isServiceAdded;
		}
		return !isServiceAdded;
	});
	return newServicesToAdd;
};

export default renderServices;
