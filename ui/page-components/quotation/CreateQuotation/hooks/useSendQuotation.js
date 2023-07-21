import { Toast } from '@cogoport/components';

import { useRequestBf } from '@/packages/request';
import { useSelector } from '@/packages/store';

const useSendQuotation = () => {
	const { id: userId, name, email } = useSelector((state) => state.profile);

	const [{ loading, data }, trigger] = useRequestBf({
		method  : 'post',
		url     : 'saas/quote/send',
		authKey : 'post_saas_quote_send',
	}, { manual: true });

	const sendQuotation = async (quoteId = null) => {
		try {
			await trigger({
				params: {
					quotationId : quoteId,
					performedBy : userId,
					userName    : name,
					userEmail   : email,
				},
			});
		} catch (err) {
			Toast.error(err.error?.message);
		}
	};

	return {
		sendQuotation, sendQuoteLoading: loading, sendQuotedata: data,
	};
};

export default useSendQuotation;
