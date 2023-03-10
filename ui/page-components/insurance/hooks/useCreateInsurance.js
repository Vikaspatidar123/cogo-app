import { useState } from 'react';
import { useSelector } from 'react-redux';

import { useRequestBf } from '@/packages/request';

const useCreateInsurance = () => {
	const { profile } = useSelector((state) => state);
	const [{ loading }, trigger] = useRequestBf({
		method  : 'post',
		url     : '/saas/insurance',
		authkey : 'post_saas_insurance',
	}, { manual: true });
	const [policyIdDownload, setPolicyIdDownload] = useState();
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
				setPolicyIdDownload(resp?.data?.policyId);
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

	return { insurance, createInsuranceLoading: loading, policyIdDownload };
};
export default useCreateInsurance;
