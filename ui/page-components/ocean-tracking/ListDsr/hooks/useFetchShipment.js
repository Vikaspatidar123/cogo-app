import { Toast } from '@cogoport/components';
import { useState, useEffect } from 'react';

import { useRequest } from '@/packages/request';
import { useSelector } from '@/packages/store';

const useFetchShipments = () => {
	// const [loading, setLoading] = useState(false);
	// const { dsrs, general, setDsrs } = useSaasState();
	// const { scope } = general;
	const [shipments, setShipments] = useState([]);
	const { general, profile } = useSelector((s) => s);
	const [{ loading }, trigger] = useRequest({
		url    : 'list_saas_container_subscriptions',
		method : 'get',
	}, { manual: true });
	const fetchShipments = async () => {
		try {
			// if (showLoading) setLoading(true);
			const res = await trigger({
				params: {
					filters: {
						status                 : 'active',
						organization_branch_id : general?.query?.branch_id,
					},
					page_limit: 100,
				},
			});
			// if (showLoading) setLoading(false);
			// setLoading(false);
			const { hasError } = res || {};
			if (hasError) throw new Error();

			const { data } = res;
			setShipments(data?.list || []);
		} catch (err) {
			Toast.error('Unable to fetch shipments. Please try again.');
			// setLoading(false);
		}
	};
	useEffect(() => {
		fetchShipments();
	}, []);

	return { loading, shipments };
};

export default useFetchShipments;
