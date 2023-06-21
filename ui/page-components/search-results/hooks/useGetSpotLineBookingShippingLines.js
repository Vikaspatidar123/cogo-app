import { useEffect } from 'react';

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

	const listApi = () => {
		try {
			const payload = {
				filters: {
					id: geo.uuid.spot_booking_shipping_lines,
				},
				operator : 'shipping_line',
				status   : 'active',
			};
			const res = listOperators({ params: payload });

			if (!res.hasError) {
				return;
			}
		} catch (error) {
			console.log(error);
		}
	};

	const { list = [] } = listOperators?.data || {};

	const spotBookingDefaultShippingLines = (list || []).map((item) => item);

	useEffect(() => {
		listApi();
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return { spotBookingDefaultShippingLines, loading };
};

export default useGetSpotLineBookingShippingLines;
