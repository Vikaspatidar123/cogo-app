import { Toast } from '@cogoport/components';
import { useEffect } from 'react';

import incoTerms from '../../../constants/inco-terms.json';
import getShipperConfigs from '../configurations/Shipper/get-configs';

import getApiErrorString from '@/packages/forms/utils/getApiError';
import { useRequest } from '@/packages/request';
import { useSelector } from '@/packages/store';

const SERVICES_PARAMS_EDIT = [
	'fcl_freight_service',
	'air_freight_service',
	'lcl_freight_service',
	'rail_domestic_service',
];

const useGetShipment = () => {
	const { id, service_id } = useSelector(({ general }) => ({
		id         : general?.query?.id || '',
		service_id : general?.query?.service_id || '',
	}));
	const [{ loading, data: shipment }, getApi] = useRequest({
		url    : 'get_shipment',
		method : 'get',
	}, { manual: true });
	const [{ loading:apiloading }, updateApi] = useRequest({
		url    : 'update_shipment',
		method : 'post',
	}, { manual: true });

	const getShipment = async () => {
		try {
			const res = await getApi({
				params: {
					id,
				},
			});
			if (res.hasError) {
				Toast.error(getApiErrorString(res?.messages));
			}
		} catch (err) {
			console.log(err);
		}
	};

	const updateShipment = async (payloads) => {
		try {
			const res = await updateApi({ data: payloads });
			if (!res.hasError) {
				getShipment();
				return res;
			}
			Toast.error(getApiErrorString(res?.messages));
			return res;
		} catch (err) {
			console.log(err);
			return err;
		}
	};

	const shipperConfigs = getShipperConfigs(shipment?.summary?.shipment_type);

	const configs = shipperConfigs;

	let shipment_data = shipment?.summary || {};
	let origin_port = null;
	let destination_port = null;

	shipment?.services_detail?.forEach((service_detail) => {
		if (service_detail?.origin_port !== null) {
			origin_port = service_detail?.origin_port;
		}
		if (service_detail?.destination_port !== null) {
			destination_port = service_detail?.destination_port;
		}
	});

	shipment_data = {
		...shipment_data,
		origin_port,
		destination_port,
	};

	const rawServices = shipment?.services_details || [];

	const services = (rawServices || []).map((item) => ({
		...item,
		name: item?.service_type,
	}));

	const can_purchase_invoice_create =		shipment_data?.can_purchase_invoice_create;

	const primary_service = shipment?.primary_service_detail;

	const upsellServices = {
		origin_services      : [],
		destination_services : [],
	};

	upsellServices.origin_services = (
		shipment?.services_to_upsell?.origin_services || []
	).filter((item) => !item?.includes('local'));

	upsellServices.destination_services = (
		shipment?.services_to_upsell?.destination_services || []
	).filter((item) => !item?.includes('local'));

	const booking_note_details = shipment?.booking_note_details || [];

	const main_service_type = `${shipment_data?.shipment_type}_service`;

	shipment_data.booking_params = primary_service?.booking_params || {};
	shipment_data.can_change_booking_params_status =		primary_service?.can_change_booking_params_status || '';

	if (SERVICES_PARAMS_EDIT.includes(main_service_type)) {
		shipment_data.main_service_state = primary_service?.state || '';

		shipment_data.main_service_trade_type = (
			incoTerms.find((item) => item.value === primary_service?.inco_term) || {}
		)?.tradeType;

		shipment_data.main_service_bl_type = primary_service?.bl_type || '';

		shipment_data.cargo_weight_per_container = primary_service?.cargo_weight_per_container;
	}

	const user_id = shipment_data?.importer_exporter_id;

	useEffect(() => {
		if (id) {
			getShipment();
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [id]);

	return {
		get: {
			loading,
			refetch : getShipment,
			configs,
			data    : {
				id,
				getData: getShipment,
				service_id,
				user_id,
				shipment_data,
				services,
				can_purchase_invoice_create,
				upsellServices,
				booking_note_details,
				primary_service,
			},
		},
		update: { apiloading, updateShipment },
	};
};

export default useGetShipment;
