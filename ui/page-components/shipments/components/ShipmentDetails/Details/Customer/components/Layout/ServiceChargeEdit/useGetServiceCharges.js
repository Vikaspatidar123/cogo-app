import { useEffect } from 'react';

import { useRequest } from '@/packages/request';
import { useSelector } from '@/packages/store';

const chargeCodes = {
	fcl_freight_service       : ['fcl_freight_charges', 'fcl_freight_seasonal_charges'],
	fcl_freight_local_service : ['fcl_freight_local_charges'],
	ftl_freight_service       : ['ftl_freight_charges'],
	haulage_freight_service   : ['haulage_freight_charges'],
	fcl_customs_service       : ['fcl_customs_charges'],
	air_freight_service       : [
		'air_freight_charges',
		'air_freight_surcharges',
		'air_freight_warehouse_charges',
	],
	air_freight_local_service     : ['air_freight_local_charges'],
	air_customs_service           : ['air_customs_charges'],
	lcl_freight_service           : ['lcl_freight_charges', 'lcl_freight_surcharge_charges'],
	lcl_freight_local_service     : ['lcl_freight_local_charges'],
	lcl_customs_service           : ['lcl_customs_charges'],
	ltl_freight_service           : ['ltl_freight_charges'],
	fcl_cfs_service               : ['fcl_cfs_charges'],
	rail_domestic_freight_service : ['rail_domestic_freight_charges'],
};

const useGetServiceCharges = ({ service_name, shipment_id }) => {
	const { scope } = useSelector((state) => ({
		scope : state.general.scope,
		query : state.general.query,
	}));

	const serviceName = chargeCodes[service_name];
	const [{ loading, data }, trigger] = useRequest({
		url    : 'list_rate_charge_codes',
		method : 'get',
	}, { manual: true });
	const [{ loading:addLoading, data:addServiceData }, addTrigger] = useRequest({
		url    : 'get_shipment_additional_service_codes',
		method : 'get',
	}, { manual: true });

	const getList = async () => {
		if (serviceName) {
			await trigger({
				params: {
					service_names: [...(serviceName || []), 'platform_charges'],
				},
			});
		} else {
			await addTrigger({
				params: {
					filters: { shipment_id },
				},
			});
		}
	};

	useEffect(() => {
		if (service_name) {
			getList();
		}
	}, [service_name]);

	return {
		data    : serviceName ? data : addServiceData,
		loading : serviceName ? loading : addLoading,
	};
};

export default useGetServiceCharges;
