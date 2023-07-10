import { Toast } from '@cogoport/components';

import getApiErrorString from '@/packages/forms/utils/getApiError';
import { useRequest } from '@/packages/request';

const useCreateContractGuideAudit = ({ RFQID = '' }) => {
	const [{ loading }, trigger] = useRequest(
		{
			method : 'post',
			url    : '/create_contract_guide_audit',
		},
		{ manual: true },
	);

	const onContractGuideClose = async () => {
		try {
			await trigger({
				data: {
					action_name : 'contract_guide',
					data        : { rfq_id: RFQID },
				},
			});
		} catch (e) {
			Toast.error(getApiErrorString(e));
		}
	};

	return {
		onContractGuideClose,
		loading,
	};
};

export default useCreateContractGuideAudit;
