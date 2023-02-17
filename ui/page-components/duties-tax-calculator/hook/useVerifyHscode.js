import { Toast } from '@cogoport/components';
import { useState } from 'react';

import { useRequestBf } from '@/packages/request';
import { useSelector } from '@/packages/store';

const useVerifyHscode = () => {
	const [inputValue, setInputValue] = useState([]);
	const { profile } = useSelector((s) => s);

	const [{ loading }, trigger] = useRequestBf({
		url     : 'saas/trade-engine/hs-engine',
		authKey : 'post_saas_trade_engine_hs_engine',
		method  : 'post',
	}, { manual: true });

	const [{ loading:verifySixDigitLoading }, triggerVerifySixDigit] = useRequestBf({
		url     : '/saas/trade-engine/verify-six-digit',
		authKey : 'get_saas_trade_engine_verify_six_digit',
		method  : 'get',
	}, { manual: true });

	const verifySixDigitHs = async ({ hsCode }) => {
		try {
			const resp = await triggerVerifySixDigit({
				params: {
					hsCode,
				},
			});
			if (!resp?.data) {
				Toast.error('Please enter valid Hs Code ', {
					autoClose : 3000,
					style     : { color: '#333', background: '#FFD9D4' },
				});
			}
			return resp?.data;
		} catch (err) {
			Toast.error('Something went wrong! Please try again ', {
				autoClose : 3000,
				style     : { color: '#333', background: '#FFD9D4' },
			});
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
					// 'Hs Code for the specified destination country cannot be validated. Please enter another Hs Code',
					'This hs code is not supported by us. Please provide another hs code',
					{
						autoClose : 5000,
						style     : { color: '#333', backgroundColor: '#e9faff' },
					},
				);
				setValidateInProgress(true);
			}
			if (!resp?.data?.status && resp?.data?.recommendations.length > 0) {
				Toast.info('Invalid HS Code. Please select from dropdown', {
					autoClose : 5000,
					style     : { color: '#333', backgroundColor: '#e9faff' },
				});
				setValidateInProgress(true);
			}

			setStatus(resp?.data?.status);
			setInputValue(resp?.data?.recommendations);
		} catch (error) {
			Toast.error('Something went wrong! Please try again ', {
				autoClose : 3000,
				style     : { color: '#333', background: '#FFD9D4' },
			});
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
