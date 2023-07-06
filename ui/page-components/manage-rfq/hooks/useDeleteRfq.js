import { Toast } from '@cogoport/components';

import getApiErrorString from '@/packages/forms/utils/getApiError';
import { useRequest } from '@/packages/request';

const useDeleteRfq = ({ getRfqList, getRfqStats, rfqId }) => {
	const [{ loading }, trigger] = useRequest({ method: 'post', url: '/update_rfq' }, { manual: true });

	const deleteRfq = async (id) => {
		try {
			await trigger({
				data: {
					id     : id || rfqId,
					status : 'inactive',
				},
			});

			Toast.success('RFQ Deleted Successfully.');
			getRfqList();
			getRfqStats();
		} catch (e) {
			Toast.error(getApiErrorString(e));
		}
	};

	return {
		deleteRfq,
		deleteLoading: loading,
	};
};

export default useDeleteRfq;
