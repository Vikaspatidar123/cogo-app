import { useEffect } from 'react';

import { useRequest } from '@/packages/request';
import { useSelector } from '@/packages/store';

const useGetSupplier = ({ service_id, service_type }) => {
	const { query } = useSelector((state) => ({
		scope : state.general.scope,
		query : state.general.query,
	}));
	const [{ loading, data }, trigger] = useRequest({
		url    : 'list_shipment_booking_confirmation_preferences',
		method : 'get',
	}, { manual: true });
	const getList = async (shipment_id) => {
		await trigger({
			params: {
				filters: { shipment_id, service_id, service_type },
			},
		});
	};

	useEffect(() => {
		if (query.id) {
			getList(query.id);
		}
	}, [query.id]);

	return {
		data,
		loading,
	};
};

export default useGetSupplier;
