import { Toast } from '@cogoport/components';

import getApiErrorString from '@/packages/forms/utils/getApiError';
import { useRequest } from '@/packages/request';

const useDuplicateRfq = ({ getRfqList, getRfqStats, rfqId }) => {
	const [{ loading }, trigger] = useRequest(
		{
			method : 'post',
			url    : '/create_duplicate_rfq',
		},
		{
			manual: true,
		},
	);

	const duplicateRfq = async (rfq_name, error, setError) => {
		try {
			if (rfq_name) {
				await trigger({
					data: {
						rfq_id: rfqId,
						rfq_name,
					},
				});

				Toast.success('RFQ Duplicated successfully.');

				getRfqList();
				getRfqStats();
			} else if (!error) {
				setError(true);
			}
		} catch (err) {
			Toast.error(getApiErrorString(err?.data));
		}
	};

	return { duplicateRfq, duplicateLoading: loading };
};

export default useDuplicateRfq;
