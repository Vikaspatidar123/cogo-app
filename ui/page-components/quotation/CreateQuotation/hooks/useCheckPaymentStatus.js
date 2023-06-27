import { Toast } from '@cogoport/components';
import { useRouter } from 'next/router';
import { useEffect, useState, useCallback } from 'react';

import { useRequestBf } from '@/packages/request';

let count = 0;
const useCheckPaymentStatus = ({
	setPendingModal, isUserSubscribed, isQuotaLeft, setTransactionModal, setValidateProduct, getDraft, postTradeEngine,
}) => {
	const { query } = useRouter();
	const { billId } = query || {};

	const [pendingStatus, setPendingStatus] = useState(false);

	const [{ loading }, trigger] = useRequestBf({
		method  : 'get',
		url     : 'saas/bill/status',
		authKey : 'get_saas_bill_status',
	}, { manual: true });

	const paymentSuccessHandler = useCallback((resp) => {
		const quotationId = resp?.data?.billRefId;
		if (!isUserSubscribed || !isQuotaLeft) {
			setPendingModal(false);
			getDraft(quotationId);
			setValidateProduct(true);
		} else {
			setPendingModal(false);
			setTransactionModal(true);
			postTradeEngine({ tradeEngineInputId: quotationId, paymentMode: 'PAYMENT' });
		}
	}, [getDraft, isQuotaLeft, isUserSubscribed, postTradeEngine, setPendingModal,
		setTransactionModal, setValidateProduct]);

	const checkPaymentStatus = useCallback(async () => {
		try {
			const resp = await trigger({
				params: {
					billId,
				},
			});
			if (resp?.data?.status === 'PAID') {
				paymentSuccessHandler(resp);
			} else {
				setPendingModal(true);
				if (count < 10) {
					count += 1;
					setTimeout(async () => {
						await checkPaymentStatus();
					}, 2000);
				} else {
					setPendingStatus(true);
					Toast.warn('Payment is Pending');
				}
			}
		} catch (error) {
			Toast.error(error?.message);
		}
	}, [billId, paymentSuccessHandler, setPendingModal, trigger]);

	useEffect(() => {
		if (billId) checkPaymentStatus();
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [billId]);

	return {
		pendingStatus, loading,
	};
};

export default useCheckPaymentStatus;
