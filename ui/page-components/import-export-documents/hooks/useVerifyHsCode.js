import { Toast } from '@cogoport/components';
import { useState } from 'react';

import { useRequestBf } from '@/packages/request';
import { useSelector } from '@/packages/store';

const useVerifyHscode = () => {
	const [inputValue, setInputValue] = useState([]);
	const { profile } = useSelector((state) => state);

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
					performedBy: profile?.id,
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
