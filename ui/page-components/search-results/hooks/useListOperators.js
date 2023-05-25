import { useEffect } from 'react';

import { useRequest } from '@/packages/request';
import getGeoConstants from '@/ui/commons/constants/geo';

const useListOperators = () => {
	const geo = getGeoConstants();

	const [{ loading, data }, trigger] = useRequest(
		{
			url    : 'list_operators',
			method : 'get',
		},
		{ manual: true },
	);

	const listApi = () => trigger({
		params: {
			filters: {
				operator_type : 'shipping_line',
				status        : 'active',
				id            : geo.uuid.spot_booking_shipping_lines,
			},
		},
	});

	useEffect(() => {
		listApi();
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return {
		shippingLines: data?.list,
		loading,
	};
};

export default useListOperators;
