import { Toast } from '@cogoport/components';
import { useTranslation } from 'next-i18next';
import { useState } from 'react';

import { useRouter } from '@/packages/next';
import { useRequestBf } from '@/packages/request';
import { useSelector } from '@/packages/store';

const useVerifyHscode = () => {
	const { query } = useRouter();
	const { t } = useTranslation(['importExportDoc']);
	const { profile } = useSelector((state) => state);

	const [inputValue, setInputValue] = useState([]);
	const paymentType = query?.billId ? 'PAYMENT' : 'QUOTA';
	const [{ loading }, trigger] = useRequestBf({
		method  : 'post',
		url     : 'saas/trade-engine/hs-engine',
		authKey : 'post_saas_trade_engine_hs_engine',
	}, { manual: true });

	const [{ loading: verifySixDigitLoading }, verifySixDigit] = useRequestBf({
		method  : 'get',
		url     : '/saas/trade-engine/verify-six-digit',
		authKey : 'get_saas_trade_engine_verify_six_digit',
	}, { manual: true });

	const verifySixDigitHs = async ({ hsCode }) => {
		try {
			const resp = await verifySixDigit({
				params: {
					hsCode,
				},
			});
			if (!resp?.data) {
				Toast.error(t('importExportDoc:api_hscode_error_2'));
			}
			return resp?.data;
		} catch (err) {
			Toast.error(t('importExportDoc:api_hscode_error_1'));
			return false;
		}
	};
	const verifyHsCode = async ({
		hsCode,
		destinationCountryCode,
		setStatus,
		setValidateInProgress,
	}) => {
		try {
			const resp = await trigger({
				data: {
					hsCode,
					destinationCountryCode,
					organizationId : profile?.organization?.id,
					performedBy    : profile?.id,
					paymentType,
				},
			});

			if (!resp?.data?.status && resp?.data?.recommendations.length === 0) {
				Toast.info(t('importExportDoc:api_hscode_error_3'));
				setValidateInProgress(true);
			}
			if (!resp?.data?.status && resp?.data?.recommendations.length > 0) {
				Toast.info(t('importExportDoc:api_hscode_error_4'));
				setValidateInProgress(true);
			}

			setStatus(resp?.data?.status);
			setInputValue(resp?.data?.recommendations);
		} catch (error) {
			Toast.error(t('importExportDoc:api_hscode_error_1'));
		}
	};

	return {
		inputValue,
		verifyHsCode,
		checkLoading: loading,
		verifySixDigitHs,
		verifySixDigitLoading,
	};
};

export default useVerifyHscode;
