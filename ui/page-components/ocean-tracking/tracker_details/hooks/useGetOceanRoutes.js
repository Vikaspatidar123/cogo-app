import { useState } from 'react';

import { useRequest } from '@/packages/request';

function useGetOceanRoutes() {
	const [mapPoints, setMapPoints] = useState([]);

	const [{ loading }, trigger] = useRequest({
		url    : 'get_container_sea_route',
		method : 'post',
	}, { manual: true });

	// const getAllOceanRoutes = async () => {
	// 	let requestData = {};
	// 	requestData = {
	// 		status                         : 'active',
	// 		saas_container_subscription_id : saasSubscriptionId,
	// 	};

	// 	try {
	// 		const res = await trigger({ data: requestData });
	// 		const { hasError, data } = res || {};
	// 		Toast.error(data?.message);
	// 		if (hasError) throw new Error();

	// 		console.log(res, 'res');
	// 	} catch (err) {
	// 		Toast.error(err?.data?.message);
	// 	}
	// };
	const getAllOceanRoutes = async (ocean_data) => {
		try {
			const container_no = ocean_data.container_details.map((c) => c.container_no).flat();
			const request_data = {
				saas_container_subscriptions: [
					{
						saas_container_subscription_id : ocean_data.id,
						type                           : ocean_data.type,
						container_no,
					},
				],
			};
			const res = await trigger({ data: request_data });

			const { hasError } = res || [];
			if (hasError) throw new Error();
			else if (res.data?.length) {
				container_no.map((c) => {
					const container = res.data.filter((r) => r.container_no === c);
					if (container.length > 0) {
						const pre_points = container.map((a) => a.data).flat();
						setMapPoints((prevPoints) => [
							...prevPoints,
							{
								container_no : c,
								route        : pre_points,
							},
						]);
					}
					return true;
				});
			}
			return res.data;
		} catch (err) {
			return [];
		}
	};

	return {
		loading,
		getAllOceanRoutes,
	};
}

export default useGetOceanRoutes;
