import { useEffect } from 'react';

import { useRequest } from '@/packages/request';

const useGetShippinglines = () => {
	const [{ loading, data }, trigger] = useRequest({
		url: '/list_operators',
		method: 'get',
	}, { manual: true });

	const shippinglines = async () => {
		try {
			await trigger({
				params: {
					filters: {
						status: 'active',
						operator_type: ['shipping_line'],
					},
					page_limit: 1000,
				},
			});
		} catch (err) {
			console.log(err);
		}
	};
	useEffect(() => {
		shippinglines();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	return {
		shippinglines,
		shippingline: data?.list,
		loading,
	};
};
export default useGetShippinglines;
