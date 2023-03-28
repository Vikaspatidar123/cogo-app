import { useRequest } from '@cogo/commons/hooks';
import getGeoConstants from '@cogo/globalization/constants/geo';
import { useSelector } from '@cogo/store';
import { useEffect } from 'react';

const geo = getGeoConstants();

const useGetSpotLineBookingShippingLines = () => {
	const { scope } = useSelector(({ general }) => ({ scope: general?.scope }));
	const listOperators = useRequest('get', false, scope)('/list_operators');

	const listApi = async () => {
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
	};

	const { list = [] } = listOperators?.data || {};

	const spotBookingDefaultShippingLines = (list || []).map((item) => item);

	useEffect(() => {
		listApi();
	}, []);

	return { spotBookingDefaultShippingLines };
};

export default useGetSpotLineBookingShippingLines;
