import { Toast } from '@cogoport/components';
import { useEffect, useCallback } from 'react';

import { useRouter } from '@/packages/next';
import { useRequestBf } from '@/packages/request';
import { useSelector } from '@/packages/store';

const useEditQuotation = () => {
	const { profile } = useSelector((state) => state);
	const { query } = useRouter();
	const [{ loading, data }, trigger] = useRequestBf({
		method  : 'get',
		url     : '/saas/quote/',
		authKey : 'get_saas_quote',
	}, { manual: true });

	const editQuotation = useCallback(async (id) => {
		try {
			await trigger({ params: { quotationId: id, userId: profile.id } });
		} catch (err) {
			Toast.error(err?.message);
		}
	}, [profile.id, trigger]);

	useEffect(() => {
		if (query.id) {
			editQuotation(query.id);
		}
	}, [editQuotation, query?.id]);

	return {
		editData    : data,
		editLoading : loading,
	};
};
export default useEditQuotation;
