import { useRouter } from '@/packages/next';
import { useRequestBf } from '@/packages/request';
import { useSelector } from '@/packages/store';

const useViewQuote = () => {
	const { query } = useRouter();
	const { id } = query;

	const { profile } = useSelector((state) => state);

	const [{ loading, data: viewQuoteData }] = useRequestBf({
		method  : 'get',
		url     : '/saas/quote',
		authKey : 'get_saas_quote',
		params  : {
			quotationId : id,
			userId      : profile.id,
		},
	}, { manual: false });

	return {
		loading, viewQuoteData, quoteId: id,
	};
};

export default useViewQuote;
