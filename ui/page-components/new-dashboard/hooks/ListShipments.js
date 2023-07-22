import { Toast } from '@cogoport/components';
import { useEffect } from 'react';

import { useRequest } from '@/packages/request';

function ListShipments() {
	const [{ loading, data }, trigger] = useRequest({
		url    : '/list_shipments',
		method : 'get',
	}, { manual: true });

	const shipmentsData = async (shipment_received, confirmed_by_importer_exporter) => {
		try {
			const reqData = {
				shipment_reciever : shipment_received,
				confirmation      : confirmed_by_importer_exporter,
				// page              : 1,
				// page_limit        : 2,
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
	};

	useEffect(() => {
		shipmentsData();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	return { loading, shipmentsData, data };
}
export default ListShipments;
