import { Toast } from '@cogoport/components';

import getApiErrorString from '@/packages/forms/utils/getApiError';
import { useRequest } from '@/packages/request';
import { useSelector } from '@/packages/store';

const CARGO_HANDLING_TRANPORTATION_MAPPING = {
	dock_stuffing                         : 'ftl_freight',
	factory_stuffing                      : 'trailer_freight',
	stuffing_at_factory                   : 'trailer_freight',
	stuffing_at_dock                      : 'ftl_freight',
	destuffing_at_dock                    : 'ftl_freight',
	direct_port_delivery                  : 'trailer_freight',
	delivery_from_dock                    : 'trailer_freight',
	dpd_without_cfs                       : 'trailer_freight',
	dpd_cfs_dock_destuffing               : 'trailer_freight',
	dpd_cfs_factory_destuffing            : 'trailer_freight',
	enpanelled_cfs_dock_destuffing        : 'trailer_freight',
	enpanelled_cfs_factory_destuffing     : 'trailer_freight',
	non_enpanelled_cfs_factory_destuffing : 'trailer_freight',
	non_enpanelled_cfs_dock_destuffing    : 'trailer_freight',
};

const singleLocationServices = ['fcl_freight_local'];

const useAddService = (service, summary, source) => {
	const { search_id, checkout_id } = useSelector(
		({ general }) => general.query,
	);

	const isSingleLocationService = singleLocationServices.includes(
		summary.search_type || summary.mode,
	);

	const mode =		source === 'checkout' ? summary.primary_service : summary.search_type;

	const [{ loading }, trigger] = useRequest({
		url: source === 'checkout'
			? '/create_checkout_service'
			: '/create_spot_search_service',
		method: 'post',
	}, { manual: true });

	const handleAddService = async (formData = {}) => {
		let serviceName = service.service_type;

		if (service.service_type === 'transportation') {
			serviceName =				CARGO_HANDLING_TRANPORTATION_MAPPING[formData.cargo_handling_type]
				|| 'ftl_freight';
		}

		let terminal_charge_type = '';
		if (
			summary?.trade_type === 'domestic'
			&& service?.name === 'export_air_freight_local'
		) {
			terminal_charge_type = 'outbound';
		} else if (
			summary?.trade_type === 'domestic'
			&& service?.name === 'import_air_freight_local'
		) {
			terminal_charge_type = 'inbound';
		}

		let airFreightData = (
			Object.values(summary?.service_details || {}) || []
		).find((element) => element?.service_type === 'air_freight');

		if (source === 'checkout') {
			airFreightData = (Object.values(summary?.services || {}) || []).find(
				(element) => element?.service_type === 'air_freight',
			);
		}

		let services = [];

		const listName = mode === 'fcl_freight' ? 'containers' : 'packages';

		summary[listName].forEach((listItem) => {
			const serviceObj = {
				status     : 'active',
				...formData,
				bls_count  : listItem.bls_count || summary.bls_count || 1,
				trade_type : service.trade_type || undefined,
			};

			const getLocationType = () => {
				if (isSingleLocationService) {
					return 'port';
				}
				return service.trade_type === 'export' ? 'origin' : 'destination';
			};

			const locationType =				service.trade_type === 'export' ? 'origin' : 'destination';

			switch (serviceName) {
				case 'fcl_customs':
					serviceObj.port_id = summary[getLocationType()].id;
					break;
				case 'air_customs':
					serviceObj.airport_id = summary[getLocationType()].id;
					delete serviceObj.bls_count;
					break;
				case 'lcl_customs':
					serviceObj.location_id = summary[getLocationType()].id;
					break;
				case 'fcl_cfs':
					serviceObj.port_id = summary[getLocationType()].id;
					break;
				case 'fcl_freight_local':
					serviceObj.port_id = summary[getLocationType()].id;
					break;
				case 'lcl_freight_local':
					serviceObj.port_id = summary[getLocationType()].id;
					break;

				case 'air_freight_local':
					serviceObj.airport_id = summary[getLocationType()].id;
					serviceObj.trade_type = service?.trade_type;
					serviceObj.terminal_charge_type = terminal_charge_type || undefined;
					serviceObj.logistics_service_type =						airFreightData?.logistics_service_type;
					serviceObj.payment_type = airFreightData?.payment_type;
					serviceObj.cargo_value = airFreightData?.cargo_value;
					serviceObj.cargo_value_currency =						airFreightData?.cargo_value_currency;
					serviceObj.dry_ice_required = airFreightData?.dry_ice_required;
					serviceObj.packages_count = airFreightData?.packages_count;
					serviceObj.weight = airFreightData?.weight;
					serviceObj.volume = airFreightData?.volume;
					serviceObj.status = airFreightData?.status;
					serviceObj.commodity = airFreightData?.commodity;
					serviceObj.commodity_details = airFreightData?.commodity_details;
					serviceObj.packages = airFreightData?.packages;
					break;
				case 'haulage_freight':
					serviceObj.transport_mode = 'rail';
					serviceObj[`${locationType}_location_id`] =	summary[getLocationType()].id;

					if (source === 'checkout') {
						serviceObj.service_type = 'haulage_freight';
						serviceObj[
							`${
								locationType === 'origin' ? 'destination' : 'origin'
							}_location_id`
						] = summary[`${locationType}_main`].id;
					}

					delete serviceObj.bls_count;

					break;
				case 'trailer_freight':
					serviceObj[`${locationType}_location_id`] = formData.location_id;

					if (locationType === 'origin') {
						serviceObj.destination_location_id = summary.origin?.id || summary.port?.id;
					} else {
						serviceObj.origin_location_id =	summary.destination?.id || summary.port?.id;
					}

					if (mode === 'fcl_freight' && source === 'checkout') {
						serviceObj.service_type = 'trailer_freight';
						delete serviceObj.cargo_handling_type;
						delete serviceObj.location_id;
						delete serviceObj.truck_type;
						delete serviceObj.trucks_count;
						delete serviceObj.bls_count;
					}

					break;
				case 'ftl_freight':
					serviceObj[`${locationType}_location_id`] = formData.location_id;

					if (locationType === 'origin') {
						serviceObj.destination_location_id = summary.origin?.id || summary.port?.id;
					} else {
						serviceObj.origin_location_id =	summary.destination?.id || summary.port?.id;
					}

					if (mode === 'lcl_freight') {
						delete serviceObj.bls_count;
					} else if (mode === 'air_freight') {
						delete serviceObj.packages_count;
					} else if (mode === 'fcl_freight') {
						serviceObj.trip_type = 'one_way';
					}

					break;
				default:
			}

			[
				'container_type',
				'container_size',
				'containers_count',
				'commodity',
				'cargo_weight_per_container',
				'packages_count',
				'weight',
				'volume',
			].forEach((item) => {
				if (listItem[item]) {
					serviceObj[item] = listItem[item];
				}
			});

			if (serviceName === 'ftl_freight') {
				delete serviceObj.location_id;
				delete serviceObj.cargo_handling_type;
				delete serviceObj.bls_count;
				delete serviceObj.container_type;
				delete serviceObj.container_size;
				delete serviceObj.containers_count;
				delete serviceObj.cargo_weight_per_container;
			}

			serviceObj.commodity =				mode === 'fcl_freight_local' ? null : serviceObj.commodity || 'general';

			if (mode === 'lcl_freight' && serviceName === 'ftl_freight') {
				delete serviceObj.packages_count;
				delete serviceObj.volume;
				delete serviceObj.weight;
			}

			if (mode === 'air_freight' && serviceName === 'ftl_freight') {
				delete serviceObj.packages_count;
				delete serviceObj.volume;
				delete serviceObj.weight;
			}

			if (mode === 'air_freight') {
				delete serviceObj.bls_count;
			}

			services.push(serviceObj);
		});

		let apiServiceName = serviceName;

		if (
			mode === 'fcl_freight'
			&& serviceName === 'trailer_freight'
			&& source === 'checkout'
		) {
			apiServiceName = 'haulage_freight';
		}

		if (mode === 'air_freight' && serviceName !== 'air_freight_local') {
			let packages_count = 0;
			let volume = 0;
			let weight = 0;

			(services || []).forEach((element) => {
				packages_count += element?.packages_count || 0;
				volume += element?.volume || 0;
				weight += element?.weight || 0;
			});

			services = [
				{
					...services?.[0],
					packages_count : packages_count || undefined,
					volume         : volume || undefined,
					weight         : weight || undefined,
				},
			];
		}

		const serviceObjName =			source === 'checkout'
			? `${apiServiceName}_services_attributes`
			: `${apiServiceName}_services`;

		const params = {
			id               : source === 'checkout' ? checkout_id : search_id,
			service          : apiServiceName,
			[serviceObjName] : services,
		};

		let res = {};
		try {
			res = await trigger({
				data    : params,
				headers : {
					authorizationparameters: 'sales_dashboard:allowed',
				},
			});
			Toast.success('Service added Successfully');

			return res;
		} catch (e) {
			Toast.error(e?.response?.data?.message ? e?.response?.data?.message : getApiErrorString(e?.response?.data));
		}

		return null;
	};

	return {
		handleAddService,
		loading,
	};
};

export default useAddService;
