import { Toast } from '@cogoport/components';
import { useEffect, useCallback } from 'react';

import { useRequestBf } from '@/packages/request';

const useGetFaq = ({ showFaq }) => {
	const [{ loading, data }, trigger] = useRequestBf({
		url     : '/saas/faq',
		method  : 'get',
		authKey : 'get_saas_faq',
	}, { manual: true });

	const response = useCallback(async () => {
		try {
			await trigger({
				params: {
					serviceName: 'INSURANCE',
				},
			});
		} catch (error) {
			Toast.error(error?.error?.message);
		}
	}, [trigger]);

	useEffect(() => {
		if (showFaq === 'block') {
			response();
		}
	}, [response, showFaq]);

	return {
		faqDetails: data,
		loading,
		response,
	};
};

export default useGetFaq;
