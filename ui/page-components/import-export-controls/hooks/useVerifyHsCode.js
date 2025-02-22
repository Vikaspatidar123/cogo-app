import { Toast } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';
import { useTranslation } from 'next-i18next';
import { useState } from 'react';

import { useRouter } from '@/packages/next';
import { useRequestBf } from '@/packages/request';
import { useSelector } from '@/packages/store';

const useVerifyHscode = () => {
	const { query = {} } = useRouter();

	const { t } = useTranslation(['importExportControls']);

	const { profile } = useSelector((state) => state);

	const [inputValue, setInputValue] = useState([]);
	const { id = '', organization = {} } = profile;
	const { billId = '' } = query || {};

	const [{ loading }, trigger] = useRequestBf({
		method  : 'post',
		url     : '/saas/trade-engine/hs-engine',
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
				Toast.error(t('importExportControls:api_hscode_error_2'));
			}
			return resp?.data;
		} catch (err) {
			Toast.error(t('importExportControls:api_hscode_error_1'));
			return false;
		}
	};

	const verifyHsCode = async ({
		hsCode,
		destinationCountryCode,
		setStatus,
		setValidateInProgress,
		setPrevHs,
		isImport = false,
	}) => {
		try {
			const resp = await trigger({
				data: {
					hsCode,
					destinationCountryCode,
					performedBy    : id,
					organizationId : organization?.id,
					paymentType    : billId ? 'PAYMENT' : 'QUOTA',
				},
			});
			const { data = {} } = resp || {};
			const { status = false, recommendations = [] } = data || {};

			if (!status) {
				setValidateInProgress(true);

				if (isEmpty(recommendations)) {
					Toast.info(t('importExportControls:api_hscode_error_3'));
				} else {
					Toast.info(t('importExportControls:api_hscode_error_4'));
				}
			} else if (recommendations.length === 0) {
				const hsKey = isImport ? 'importHs' : 'exportHs';
				setPrevHs((prev) => ({ ...prev, [hsKey]: hsCode }));
			}

			setStatus(status);
			setInputValue(recommendations);
		} catch (error) {
			Toast.error(t('importExportControls:api_hscode_error_1'));
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
