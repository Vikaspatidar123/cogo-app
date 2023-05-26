import { useState } from 'react';
import { useRequest } from '@cogo/commons/hooks';
import toast from '@cogoport/front/components/admin/Toast';
import { useRouter } from '@cogo/next';
import { useSaasState } from '../../../common/context';

const useVerifyHscode = () => {
	const { query = {} } = useRouter();
	const { profile } = useSaasState();

	const [inputValue, setInputValue] = useState([]);
	const { id = '', organization = {} } = profile;
	const { billId = '' } = query || {};

	const { trigger, loading } = useRequest('post', false, 'saas', {
		authkey: 'post_saas_trade_engine_hs_engine',
	})('/saas/trade-engine/hs-engine');

	const { trigger: verifySixDigit, loading: verifySixDigitLoading } =
		useRequest('get', false, 'saas', {
			authkey: 'get_saas_trade_engine_verify_six_digit',
		})('/saas/trade-engine/verify-six-digit');

	const verifySixDigitHs = async ({ hsCode }) => {
		try {
			const resp = await verifySixDigit({
				params: {
					hsCode,
				},
			});
			if (!resp?.data) {
				toast.error('Please enter valid Hs Code ', {
					autoClose: 3000,
					style: { color: '#333', background: '#FFD9D4' },
				});
			}
			return resp?.data;
		} catch (err) {
			toast.error('Something went wrong! Please try again ', {
				autoClose: 3000,
				style: { color: '#333', background: '#FFD9D4' },
			});
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
					performedBy: id,
					organizationId: organization?.id,
					paymentType: billId ? 'PAYMENT' : 'QUOTA',
				},
			});
			const { data = {} } = resp || {};
			const { status = false, recommendations = [] } = data || {};

			if (!status && recommendations.length === 0) {
				toast.info(
					'This hs code is not supported by us. Please provide another hs code',
					{
						style: { color: '#333', backgroundColor: '#e9faff' },
					},
				);
				setValidateInProgress(true);
			}
			if (!status && recommendations.length > 0) {
				toast.info('Invalid HS Code. Please select from dropdown', {
					style: { color: '#333', backgroundColor: '#e9faff' },
				});
				setValidateInProgress(true);
			}
			if (status && recommendations.length === 0) {
				const hsKey = isImport ? 'importHs' : 'exportHs';
				setPrevHs((prev) => ({ ...prev, [hsKey]: hsCode }));
			}

			setStatus(status);
			setInputValue(recommendations);
		} catch (error) {
			toast.error('Something went wrong! Please try again ', {
				style: { color: '#333', background: '#FFD9D4' },
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
