import { useRequest } from '@cogo/commons/hooks';
import toast from '@cogoport/front/components/admin/Toast';
import { useState } from 'react';

import { useSaasState } from '../../../common/context';

const useGetOrderDetails = ({ pagination }) => {
	const [orderDetails, setOrderDetails] = useState(null);
	const { general, profile } = useSaasState();
	const { scope } = general;
	const [orderBy, setOrderBy] = useState({});

	const fetch = useRequest('get', false, scope)('/saas_get_usage_history');

	const fetchOrderDetails = async () => {
		try {
			const res = await fetch.trigger({
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
			toast.error('Unable to fetch order details. Please try again.');
		}
	};

	return {
		fetchOrderLoading: fetch.loading,
		orderDetails,
		setOrderBy,
		orderBy,
		fetchOrderDetails,
	};
};

export default useGetOrderDetails;
