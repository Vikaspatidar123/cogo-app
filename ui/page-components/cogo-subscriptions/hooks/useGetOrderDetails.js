import { Toast } from '@cogoport/components';
import { useTranslation } from 'next-i18next';
import { useState, useEffect, useCallback } from 'react';

import { useRequest } from '@/packages/request';
import { useSelector } from '@/packages/store';

const DEFAULT_PAGINATION = 1;

const getPayload = ({ profile, pagination, orderBy }) => ({
	organization_id : profile.organization.id,
	page            : pagination,
	sorting         : orderBy,
});

const useGetOrderDetails = ({ pendingModal }) => {
	const { t } = useTranslation(['subscriptions']);
	const { profile } = useSelector((state) => state);

	const [orderDetails, setOrderDetails] = useState({});
	const [orderBy, setOrderBy] = useState({});
	const [pagination, setPagination] = useState(DEFAULT_PAGINATION);

	const [{ loading }, trigger] = useRequest({
		url    : '/saas_get_usage_history',
		method : 'get',
	}, { manual: true });

	const fetchOrderDetails = useCallback(async () => {
		const payload = getPayload({ profile, pagination, orderBy });
		try {
			const res = await trigger({
				params: payload,
			});

			const { data } = res;

			if (data) {
				setOrderDetails(data);
			}
		} catch (err) {
			Toast.error(t('subscriptions:unabel_fetch_message'));
		}
	}, [orderBy, pagination, profile, t, trigger]);

	useEffect(() => {
		if (!pendingModal) fetchOrderDetails();
	}, [pagination, pendingModal, orderBy, fetchOrderDetails]);

	return {
		fetchOrderLoading: loading,
		orderDetails,
		setOrderBy,
		orderBy,
		fetchOrderDetails,
		pagination,
		setPagination,
	};
};

export default useGetOrderDetails;
