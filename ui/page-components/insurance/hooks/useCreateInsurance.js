import { useSelector } from 'react-redux';

import { useRequestBf } from '@/packages/request';

const useCreateInsurance = () => {
	const { profile } = useSelector((state) => state);
	const [{ loading, data }, trigger] = useRequestBf({
		method  : 'post',
		url     : '/saas/insurance',
		authkey : 'post_saas_insurance',
	}, { manual: true });
	const insurance = async (policyId = '', saasBillId = '', setModal = () => {}) => {
		try {
			const resp = await trigger({
				data: {
					performedBy: profile?.id,
					policyId,
					saasBillId,
				},
			});
			if (resp?.data) {
				setModal((prev) => ({
					...prev,
					showSuccessModal : true,
					pendingModal     : false,
				}));
			}
		} catch (error) {
			setModal((prev) => ({
				...prev,
				showSuccessModal : true,
				pendingModal     : false,
			}));
		}
	};

	return {
		insurance,
		createInsuranceLoading : loading,
		policyIdDownload       : data?.policyId,
		postInsuranceResponse  : data,
	};
};
export default useCreateInsurance;
