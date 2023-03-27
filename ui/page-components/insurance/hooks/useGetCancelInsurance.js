import { Toast } from '@cogoport/components';
import { useSelector } from 'react-redux';

import { useRequestBf } from '@/packages/request';

const useGetCancellation = ({ setCancelModal }) => {
	const { profile } = useSelector((state) => state);
	const [{ loading }, trigger] = useRequestBf({
		method  : 'get',
		authkey : 'get_saas_insurance_cancel',
		url     : '/saas/insurance/cancel',
	});

	const requestCancellation = async ({
		policyId = '',
		cancellationReason = '',
	}) => {
		try {
			const res = await trigger({
				params: {
					policyId,
					performedBy: profile?.id,
					cancellationReason,
				},
			});
			if (res?.data) {
				setCancelModal(false);
				Toast.success('Cancelled successfully!!!');
			}
		} catch (error) {
			Toast.error(
				'We could not initiate cancellation process right now. Please try again after some time',
				{
					style: {
						background : '#FFD9D4',
						color      : '#333',
					},
					autoClose: 5000,
				},
			);
		}
	};
	return {
		requestCancellation,
		cancellationLoading: loading,
	};
};

export default useGetCancellation;
