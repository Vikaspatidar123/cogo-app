import { Toast } from '@cogoport/components';
import { useTranslation } from 'next-i18next';
import { useState } from 'react';

import { useRequestBf } from '@/packages/request';

const MAX_API_TRIES = 10;
let count = 0;
const API_CALL_TIME = 2000;
const useCheckPaymentStatus = ({
	setShowPendingModal,
	paymentSuccessHandler,
	billId,
}) => {
	const { t } = useTranslation(['importExportControls']);
	const [stop, setStop] = useState(false);

	const [{ loading }, trigger] = useRequestBf({
		method  : 'get',
		url     : '/saas/bill/status',
		authKey : 'get_saas_bill_status',
	}, { manual: true });

	const checkPaymentStatus = async () => {
		try {
			const resp = await trigger({
				params: {
					billId,
				},
			});
			setShowPendingModal(true);

			if (resp?.data?.status === 'PAID') {
				paymentSuccessHandler(resp?.data);
			} else if (count < MAX_API_TRIES) {
				count += 1;
				setTimeout(async () => {
					await checkPaymentStatus();
				}, API_CALL_TIME);
			} else {
				setStop(true);
				Toast.warn(t('importExportControls:api_payment_pending'));
			}
			return resp?.data;
		} catch (err) {
			console.error(err?.error?.message);
			return null;
		}
	};

	return {
		checkPaymentLoading: loading,
		stop,
		checkPaymentStatus,
	};
};

export default useCheckPaymentStatus;
