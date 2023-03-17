import { Toast } from '@cogoport/components';
import { useState, useEffect } from 'react';

import { useRequest } from '@/packages/request';
import { useSelector } from '@/packages/store';

const useFetchDsr = () => {
	// const [loading, setLoading] = useState(false);
	// const { dsrs, general, setDsrs } = useSaasState();
	// const { scope } = general;
	const { general } = useSelector((s) => s);
	const { scope } = general;
	const [dsrs, setDsrs] = useState();
	const [{ loading }, trigger] = useRequest({
		url    : 'list_saas_dsr',
		method : 'get',
	}, { manual: true });
	const fetchDsr = async (showLoading = true) => {
		try {
			// if (showLoading) setLoading(true);

			const res = await trigger({
				params: { filters: { organization_branch_id: general?.query?.branch_id } },
			});
			// if (showLoading) setLoading(false);
			const { hasError } = res || {};
			if (hasError) throw new Error();

			const { data } = res;
			setDsrs(data?.list);
		} catch (err) {
			Toast.error('Unable to create status report. Please try again.');
			// if (showLoading) setLoading(false);
		}
	};

	useEffect(() => {
		fetchDsr();
	}, []);

	const refetch = async () => fetchDsr(false);

	return { loading, refetch, dsrs, setDsrs };
};

export default useFetchDsr;
