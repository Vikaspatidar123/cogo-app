import { useState, useEffect, useCallback } from 'react';

import { useRequest } from '@/packages/request';

const useGetShipments = () => {
	const [shipmentsData, setShipmentsData] = useState([]);

	const [{ loading }, getShipments] = useRequest(
		{
			method : 'get',
			url    : '/get_app_dashboard_subscription',
		},
		{ manual: true },
	);
	const getShipmentsData = useCallback(async () => {
		const params = {
			filters: {
				state: [
					'shipment_received',
					'confirmed_by_importer_exporter',
					'in_progress',
				],
			},
			page       : 1,
			page_limit : 2,
		};
		try {
			const res = await getShipments({ params });
			if (!res.hasError) {
				const { list } = res?.data || [];
				setShipmentsData(list);
			}
			return res;
		} catch (err) {
			return false;
		}
	}, [getShipments]);

	useEffect(() => {
		getShipmentsData();
	}, [getShipmentsData]);

	return {
		shipmentsData,
		loading,
	};
};

export default useGetShipments;
