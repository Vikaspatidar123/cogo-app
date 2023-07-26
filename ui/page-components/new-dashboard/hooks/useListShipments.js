import { Toast } from '@cogoport/components';
import { useEffect, useCallback } from 'react';

import { useRequest } from '@/packages/request';

function useListShipments() {
	const [{ loading, data }, trigger] = useRequest({
		url    : '/list_shipments',
		method : 'get',
	}, { manual: true });

	const shipmentsData = useCallback(async (shipment_received, confirmed_by_importer_exporter) => {
		try {
			const reqData = {
				shipment_reciever : shipment_received,
				confirmation      : confirmed_by_importer_exporter,

			};
			const res = await trigger({ params: reqData });
			const { datas } = res;
			return datas;
		} catch (err) {
			Toast.error(
				err?.message || ' Please try again.',
			);
			return null;
		}
	}, [trigger]);

	useEffect(() => {
		shipmentsData();
	}, [shipmentsData]);
	return { loading, shipmentsData, data };
}
export default useListShipments;
