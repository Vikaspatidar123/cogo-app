import { Toast } from '@cogoport/components';
import { useState } from 'react';

import useGetServiceRates from './useGetServiceRates';

import { useRequest } from '@/packages/request';
import { useSelector } from '@/packages/store';

const useFetchQuotaDetails = () => {
	const {
		fetchServiceRates = () => {},
		serviceRates,
		serviceRatesLoading,
	} = useGetServiceRates();

	const { profile = {} } = useSelector((s) => s);
	const [modal, setModal] = useState(false);
	const [quotaDetails, setQuotaDetails] = useState();

	const [{ loading }, trigger] = useRequest({
		url    : '/saas_get_user_quota_usage',
		method : 'get',
	}, { manual: true });

	const fetchQuotaDetails = async () => {
		try {
			const res = await trigger({
				params: { organization_id: profile?.organization?.id },
			});
			if (res?.data?.priority_sequence >= 0) {
				setQuotaDetails(res?.data);
				await fetchServiceRates(res?.data?.priority_sequence);
				setModal(true);
			}
		} catch (error) {
			Toast.error(error?.error?.message);
		}
	};

	return {
		fetchQuotaDetails,
		quotaLoading: loading,
		modal,
		serviceRates,
		serviceRatesLoading,
		setModal,
		quotaDetails,
	};
};

export default useFetchQuotaDetails;
