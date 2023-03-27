import { useContext, useEffect } from 'react';

import { ShipmentDetailContext } from '../common/Context';

import { useRequest } from '@/packages/request';
import { useSelector } from '@/packages/store';

const useGetSopList = ({
	filters = [],
	reload,
	trade_partners_details,
	tdata,
	shipment_data_prop,
	primary_service_prop,
	shipment_id_prop,
}) => {
	const { query } = useSelector(({ general }) => ({
		query: general?.query,
	}));

	let [{ shipment_data, primary_service }] = useContext(ShipmentDetailContext);

	shipment_data = shipment_data_prop || shipment_data;
	primary_service = primary_service_prop || primary_service;

	const importer_exporter_id = shipment_data?.importer_exporter_id;
	const conditions = {
		shipper: {
			data : trade_partners_details?.shipper?.trade_party_id,
			key  : 'shipper_trade_party_id',
		},

		consignee: {
			data : trade_partners_details?.consignee?.trade_party_id,
			key  : 'consignee_trade_party_id',
		},

		commodity: {
			data : primary_service?.commodity_description,
			key  : 'commodity',
		},

		origin: {
			data: (primary_service?.origin_port || primary_service?.origin_airport)
				?.country?.country_id,
			key: 'origin_country_id',
		},

		destination: {
			data: (
				primary_service?.destination_port
				|| primary_service?.destination_airport
			)?.country?.country_id,
			key: 'destination_country_id',
		},

		country: {
			data: (primary_service?.origin_port || primary_service?.origin_airport)
				?.country?.country_id,
			key: 'country_id',
		},
		for_this_shipment: {
			data : shipment_id_prop || query?.id,
			key  : 'shipment_id',
		},
	};

	const Defaultconditions = [
		{ key: 'shipment_id_or_nil', value: shipment_id_prop || query?.id },
		{
			key   : 'origin_country_id_or_nil',
			value : conditions.origin.data,
		},
		{
			key   : 'destination_country_id_or_nil',
			value : conditions.destination.data,
		},
		{
			key   : 'consignee_trade_party_id_or_nil',
			value : conditions.consignee.data,
		},
		{ key: 'shipper_trade_party_id_or_nil', value: conditions.shipper.data },
		{ key: 'commodity_or_nil', value: conditions.commodity.data },
	];

	const defaultFilter = {
		organization_id: importer_exporter_id,
	};
	const customfilter = {};
	const isDomestic = conditions.destination.data === conditions.origin.data;
	Defaultconditions.forEach((condition) => {
		defaultFilter[condition.key] = condition.value || null;
		customfilter[condition.key] = condition.value || null;
	});

	if (isDomestic) {
		defaultFilter.country_id_or_nil = conditions.country.data;
		customfilter.country_id_or_nil = conditions.country.data;
	}

	if (filters) {
		filters.forEach((element) => {
			if (conditions[element]?.data) {
				const key = conditions[element]?.key;
				customfilter[key] = conditions[element]?.data;
			}
			// customfilter.conditions[element].key = conditions[element]?.data;
		});
	}
	customfilter.organization_id = importer_exporter_id;

	const finalFilters = filters.length ? customfilter : defaultFilter;
	const [{ loading, data }, trigger] = useRequest({
		url    : 'list_shipment_operating_procedures',
		method : 'get',
	}, { manual: true });

	const getList = async () => {
		await trigger({
			params: {
				filters    : finalFilters,
				page_limit : 100,
			},
		});
	};

	useEffect(() => {
		if ((shipment_id_prop || query?.id) && tdata) {
			getList();
		}
	}, [filters, reload, tdata]);

	return {
		loading,
		data,
	};
};

export default useGetSopList;
