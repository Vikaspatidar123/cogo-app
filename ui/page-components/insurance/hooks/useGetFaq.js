import { Toast } from '@cogoport/components';
import { useState } from 'react';

import { useRequestBf } from '@/packages/request';

const useGetFaq = () => {
	const [faqs, setFaqs] = useState();

	const [{ loading }, trigger] = useRequestBf({
		url     : '/saas/faq',
		method  : 'get',
		authKey : 'get_saas_faq',
	}, { manual: true });

	const response = async () => {
		try {
			const res = await trigger({
				params: {
					serviceName: 'INSURANCE',
				},
			});

			if (res?.data) {
				setFaqs(res?.data);
			}
		} catch (error) {
			Toast.error(error?.error?.message);
		}
	};

	return {
		faqDetails: faqs,
		loading,
		response,
	};
};

export default useGetFaq;
