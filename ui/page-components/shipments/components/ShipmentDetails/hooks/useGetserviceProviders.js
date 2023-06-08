import useGetShipmentServiceList from './useGetShipmentServiceList';

const useGetServiceProviders = ({ utilities, shipment_id }) => {
	const {
		listServices,
		refetch: listServiceRefetch,
		loading: serviceListLoading,
	} = useGetShipmentServiceList({ shipment_id });

	const services = listServices?.list;

	const { servProvId } = utilities;
	const arr = [];
	const filterCPServices = (services || []).filter((sp) => {
		if (sp?.collection_trade_party_id) {
			if (!arr.includes(sp?.service_provider?.business_name)) {
				arr.push(sp?.service_provider?.business_name);
				return sp;
			}
			return null;
		}
		return null;
	});

	const arr2 = [];
	const not_added_service_providers = (services || []).filter((sp) => {
		if (!sp?.collection_trade_party_id) {
			if (!arr2.includes(sp?.service_provider?.business_name)) {
				arr2.push(sp?.service_provider?.business_name);
				return sp;
			}
			return null;
		}
		return null;
	});

	const arr1 = [];
	const unique_service_provider = (services || []).filter((sp) => {
		if (sp?.collection_trade_party_id) {
			if (!arr1.includes(sp?.collection_trade_party_id)) {
				arr1.push(sp?.collection_trade_party_id);
				return sp;
			}
			return null;
		}
		return null;
	});

	const arr3 = [];
	const service_providers = (services || []).filter((sp) => {
		if (sp?.service_provider) {
			if (!arr3.includes(sp?.service_provider?.business_name)) {
				arr3.push(sp?.service_provider?.business_name);
				return sp;
			}
			return null;
		}
		return null;
	});

	const service_prov_ids = (services || []).filter((sp) => {
		if (sp?.service_provider?.id === servProvId) {
			return sp?.id;
		}
		return null;
	});

	return {
		filterCPServices,
		service_prov_ids,
		service_providers,
		unique_service_provider,
		not_added_service_providers,
		listServices,
		listServiceRefetch,
		serviceListLoading,
		services,
	};
};

export default useGetServiceProviders;
