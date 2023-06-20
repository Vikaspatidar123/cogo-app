import { Toast } from '@cogoport/components';
import { useState } from 'react';

import { useRouter } from '@/packages/next';
import { useRequestBf } from '@/packages/request';
import { useSelector } from '@/packages/store';

const useVerifyHscode = () => {
	const { query = {} } = useRouter();
	const [inputValue, setInputValue] = useState([]);
	const { profile } = useSelector((s) => s);
	const { organization, id } = profile || {};
	const { billId = '' } = query || {};
	const [{ loading }, trigger] = useRequestBf({
		url: 'saas/trade-engine/hs-engine',
		authKey: 'post_saas_trade_engine_hs_engine',
		method: 'post',
	}, { manual: true });

	const [{ loading: verifySixDigitLoading }, triggerVerifySixDigit] = useRequestBf({
		url: '/saas/trade-engine/verify-six-digit',
		authKey: 'get_saas_trade_engine_verify_six_digit',
		method: 'get',
	}, { manual: true });

	const verifySixDigitHs = async ({ hsCode }) => {
		try {
			const resp = await triggerVerifySixDigit({
				params: {
					hsCode,
				},
			});
			if (!resp?.data) {
				Toast.error('Please enter valid Hs Code ');
			}
			return resp?.data;
		} catch (err) {
			Toast.error('Something went wrong! Please try again ');
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
					performedBy: id,
					organizationId: organization?.id,
					paymentType: billId ? 'PAYMENT' : 'QUOTA',

				},
			});

			if (!resp?.data?.status && resp?.data?.recommendations.length === 0) {
				Toast.info(
					'This hs code is not supported by us. Please provide another hs code',
				);
				setValidateInProgress(true);
			}
			if (!resp?.data?.status && resp?.data?.recommendations.length > 0) {
				Toast.info('Invalid HS Code. Please select from dropdown');
				setValidateInProgress(true);
			}

			setStatus(resp?.data?.status);
			setInputValue(resp?.data?.recommendations);
		} catch (error) {
			Toast.error('Something went wrong! Please try again ');
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
