import { useState } from 'react';

import { useRequest } from '@/packages/request';

function useGetallOceanRoutes() {
	const [points, setPoints] = useState([]);

	const [{ loading }, trigger] = useRequest({
		url    : 'get_container_sea_route',
		method : 'post',
	}, { manual: true });
	const getAllOceanRoutes = async (ocean_data) => {
		try {
			const container_no = ocean_data
				.map((x) => x.container_details.map((c) => c.container_no))
				.flat();
			const request_data = {
				saas_container_subscriptions: ocean_data.map((x) => ({
					saas_container_subscription_id : x.id,
					type                           : x.type,
					container_no                   : x.container_details.map((c) => c.container_no),
				})),
			};
			const res = await trigger({ data: request_data });

			const { hasError } = res || [];
			if (hasError) throw new Error();
			else if (res.data?.length) {
				container_no.map((c) => {
					const container = res.data.filter((r) => r.container_no === c);
					if (container.length > 0) {
						const pre_points = container
							.map((a) => a.data)
							.flat()
							.map((p) => ({
								lat : p[1],
								lng : p[0],
							}))
							.filter((x) => typeof x.lat !== 'undefined');
						setPoints((prevPoints) => [
							...prevPoints,
							{
								service      : 'ocean',
								container_no : c,
								data         : ocean_data.find(
									(x) => x.id === container[0].saas_container_subscription_id,
								),
								id    : container[0].saas_container_subscription_id,
								route : pre_points,
							},
						]);
					}
					return container;
				});
			}
			return res.data;
		} catch (err) {
			return [];
		}
	};

	return {
		maploading: loading,
		getAllOceanRoutes,
		points,
		setPoints,
	};
}

export default useGetallOceanRoutes;
