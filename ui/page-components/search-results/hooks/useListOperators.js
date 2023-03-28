import { useRequest } from '@cogo/commons/hooks';
import getGeoConstants from '@cogo/globalization/constants/geo';
import { useSelector } from '@cogo/store';
import { useEffect } from 'react';

const geo = getGeoConstants();

const useListOperators = () => {
	const { scope } = useSelector(({ general }) => ({ scope: general?.scope }));
	const { trigger, data, loading } = useRequest(
		'get',
		false,
		scope,
	)('/list_operators');

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
	}, []);

	return {
		shippingLines: data?.list,
		loading,
	};
};

export default useListOperators;
