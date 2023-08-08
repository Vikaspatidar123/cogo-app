import { Toast } from '@cogoport/components';

import getApiErrorString from '@/packages/forms/utils/getApiError';
import { useRequest } from '@/packages/request';

const useCreateContractRfq = ({
	rfqId = '',
	setShowContractCreation = () => {},
	setShowModal = () => {},
}) => {
	const [{ loading }, trigger] = useRequest({
		method : 'post',
		url    : '/create_rfq_contracts',
	}, { manual: true });

	const onContractRequest = async ({ values }) => {
		try {
			const payload = {
				...values,
				id     : rfqId,
				status : 'pending_approval',
			};
			await trigger({ data: payload });
			setShowContractCreation(false);
			setShowModal('successModal');
		} catch (e) {
			Toast.error(getApiErrorString(e));
		}
	};

	return {
		loading,
		onContractRequest,
	};
};

export default useCreateContractRfq;
