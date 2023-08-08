import { useEffect, useCallback } from 'react';

import { useRequest } from '@/packages/request';

const DEFAULT_PAGE = 1;
const DEFAULT_LINIT = 2;

const getPalyload = () => ({
	filters: {
		state: [
			'shipment_received',
			'confirmed_by_importer_exporter',
			'in_progress',
		],
	},
	page       : DEFAULT_PAGE,
	page_limit : DEFAULT_LINIT,
});

function ListShipments() {
	const [{ loading, data }, trigger] = useRequest({
		url    : '/list_shipments',
		method : 'get',
	}, { manual: true });

	const shipmentsData = useCallback(async () => {
		const payload = getPalyload();
		try {
			const res = await trigger({ params: payload });
			const { datas } = res;
			return datas;
		} catch (err) {
			console.error(err?.message);
			return null;
		}
	}, [trigger]);

	useEffect(() => {
		shipmentsData();
	}, [shipmentsData]);

	return { loading, shipmentsData, data };
}
export default ListShipments;
