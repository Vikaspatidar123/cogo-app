import { Toast } from '@cogoport/components';
import { useState } from 'react';

import { useRequest } from '@/packages/request';
import { useSelector } from '@/packages/store';

const useGetOrderDetails = ({ pagination }) => {
	const [orderDetails, setOrderDetails] = useState(null);
	const { profile } = useSelector((s) => s);
	const [orderBy, setOrderBy] = useState({});

	const [{ loading }, trigger] = useRequest({
		url    : '/saas_get_usage_history',
		method : 'get',
	}, { manual: true });

	const fetchOrderDetails = async () => {
		try {
			const res = await trigger({
				params: {
					organization_id : profile.organization.id,
					page            : pagination,
					sorting         : orderBy,
				},
			});

			const { hasError } = res || {};
			if (hasError) throw new Error();
			const { data } = res;

			if (data) {
				setOrderDetails(data);
			}
		} catch (err) {
			Toast.error('Unable to fetch order details. Please try again.');
		}
	};

	return {
		fetchOrderLoading: loading,
		orderDetails,
		setOrderBy,
		orderBy,
		fetchOrderDetails,
	};
};

export default useGetOrderDetails;
