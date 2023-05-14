import { useEffect } from 'react';

import { useRouter } from '@/packages/next';
import { useRequestBf } from '@/packages/request';
import { useSelector } from '@/packages/store';

const useViewQuote = () => {
	const { query } = useRouter();
	const { quotation_id } = query;

	const { profile } = useSelector((state) => state);

	const [{ loading, data: viewQuoteData }, quoteTrigger] = useRequestBf({
		method  : 'get',
		url     : '/saas/quote',
		authKey : 'get_saas_quote',
	}, { manual: true });

	const refetchQuote = async () => {
		try {
			await quoteTrigger({
				params: {
					quotationId : quotation_id,
					userId      : profile.id,
				},
			});
		} catch (error) {
			console.log(error, 'error');
		}
	};
	useEffect(() => {
		refetchQuote();
	}, []);

	return {
		loading, viewQuoteData, quoteId: quotation_id,
	};
};

export default useViewQuote;
