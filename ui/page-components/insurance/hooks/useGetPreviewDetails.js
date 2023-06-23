import { Toast } from '@cogoport/components';
import { useState } from 'react';

import { useRequestBf } from '@/packages/request';

const useGetPreviewDetails = () => {
	const [respData, setRespData] = useState();

	const [{ loading }, trigger] = useRequestBf(
		{
			method  : 'get',
			authKey : 'get_saas_insurance_details',
			url     : '/saas/insurance/details',
		},
		{ manual: true },
	);

	const refetchPreview = async (item) => {
		const { policyId = '' } = item || {};
		try {
			const resp = await trigger({
				params: {
					policyId,
				},
			});
			setRespData(resp?.data);
		} catch (error) {
			Toast.error(error?.message);
		}
	};

	return { refetchPreview, respData, previewloading: loading };
};

export default useGetPreviewDetails;
