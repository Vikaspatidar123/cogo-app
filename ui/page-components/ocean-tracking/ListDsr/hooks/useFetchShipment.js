import { useState, useEffect } from 'react';

import { useRequest } from '@/packages/request';
import { useSelector } from '@/packages/store';

const useFetchShipments = () => {
	const [shipments, setShipments] = useState([]);
	const { general } = useSelector((s) => s);
	const [{ loading }, trigger] = useRequest({
		url    : 'list_saas_container_subscriptions',
		method : 'get',
	}, { manual: true });
	const fetchShipments = async () => {
		try {
			const res = await trigger({
				params: {
					filters: {
						status                 : 'active',
						organization_branch_id : general?.query?.branch_id,
					},
					page_limit: 100,
				},
			});
			const { hasError } = res || {};
			if (hasError) throw new Error();

			const { data } = res;
			setShipments(data?.list || []);
		} catch (err) {
			console.log(err);
		}
	};
	useEffect(() => {
		fetchShipments();
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return { loading, shipments };
};

export default useFetchShipments;
