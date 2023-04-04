import { useEffect, useCallback } from 'react';

import { useRequest } from '@/packages/request';
import getGeoConstants from '@/ui/commons/constants/geo';

const useGetSpotLineBookingShippingLines = () => {
	const [{ loading }, listOperators] = useRequest(
		{
			url    : 'list_operators',
			method : 'get',
		},
		{ manual: true },
	);
	const geo = getGeoConstants();

	const listApi = useCallback(async () => {
		try {
			const payload = {
				filters: {
					id: geo.uuid.spot_booking_shipping_lines,
				},
				operator : 'shipping_line',
				status   : 'active',
			};
			const res = await listOperators.trigger({ params: payload });

			if (!res.hasError) {
				return;
			}
		} catch (error) {
			console.log(error);
		}
	}, [listOperators]);

	const { list = [] } = listOperators?.data || {};

	const spotBookingDefaultShippingLines = (list || []).map((item) => item);

	useEffect(() => {
		listApi();
	}, [listApi]);

	return { spotBookingDefaultShippingLines, loading };
};

export default useGetSpotLineBookingShippingLines;
