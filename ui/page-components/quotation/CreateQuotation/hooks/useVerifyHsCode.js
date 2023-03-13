import { Toast } from '@cogoport/components';
import { useState } from 'react';

import { useRequestBf } from '@/packages/request';
import { useSelector } from '@/packages/store';

const useVerifyHsCode = () => {
	const { id: userId } = useSelector((state) => state.profile);

	const [hsRecommendation, setHsRecommendations] = useState([]);
	const [status, setStatus] = useState(true);
	const [checkButton, setCheckButton] = useState(false);

	const [{ loading: verifyLoading }, trigger] = useRequestBf({
		method  : 'post',
		url     : 'saas/trade-engine/hs-engine',
		authKey : 'post_saas_trade_engine_hs_engine',
	}, { manual: true });

	const verifyHsCode = async ({ productInfo, destinationPortDetails, selectedHscode }) => {
		const { hsCode, productId } = productInfo || {};
		try {
			const resp = await trigger({
				data: {
					hsCode                 : hsCode || selectedHscode,
					destinationCountryCode : destinationPortDetails?.country_code,
					performedBy            : userId,
					productId,
				},
			});
			const hsStatus = resp?.data?.status;
			setStatus(hsStatus);
			setCheckButton(hsStatus);
			if (!hsStatus && resp?.data?.recommendations?.length === 0) {
				Toast.info('We Dont support this HsCode');
			} else if (hsStatus) {
				Toast.success('Valid HsCode');
			} else {
				Toast.info('Please select from dropdown');
				setHsRecommendations(resp?.data?.recommendations);
			}
		} catch (error) {
			Toast.error(error?.error?.message);
		}
	};

	return {
		hsRecommendation, status, setStatus, checkButton, verifyLoading, verifyHsCode, setCheckButton,
	};
};

export default useVerifyHsCode;
