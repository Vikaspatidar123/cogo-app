import { Toast } from '@cogoport/components';

import { useRequestBf } from '@/packages/request';
import { useSelector } from '@/packages/store';

const useGetCancellation = ({ setCancelModal = () => { }, click = 'claim', refetch = () => { } }) => {
	const { profile } = useSelector((state) => state);
	const [{ loading }, trigger] = useRequestBf({
		method  : 'post',
		authKey : `post_saas_insurance_${click}`,
		url     : `saas/insurance/${click}`,
	});

	const requestCancellation = async ({
		policyId = '',
		cancellationReason = '',
	}) => {
		try {
			const res = await trigger({
				data: {
					policyId,
					performedBy: profile?.id,
					cancellationReason,
				},
			});
			if (res?.data) {
				setCancelModal(false);
				Toast.success('Cancelled successfully!!!');
			}
			refetch({});
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
