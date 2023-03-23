import { Toast } from '@cogoport/components';
import { useEffect } from 'react';

import { useRequest } from '@/packages/request';

function ListShipments() {
	const [{ loading, data: asd }, trigger] = useRequest({
		url    : '/list_shipments',
		method : 'get',
	}, { manual: true });

	const shipmentsData = async (shipment_received, confirmed_by_importer_exporter) => {
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
	};

	useEffect(() => {
		shipmentsData();
	}, []);
	return { loading, shipmentsData, asd };
}
export default ListShipments;
