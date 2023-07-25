import { useEffect, useCallback } from 'react';

import { useRequest } from '@/packages/request';

// import toastApiError from '../utils/toastApiError';

const useGetSaasContainerSubscription = ({
	shipmentId = '',
}) => {
	const [{ loading, data }, trigger] = useRequest({
		url    : 'get_saas_container_subscription',
		method : 'GET',
	}, { manual: true });

	const getSaasContainerSubscription = useCallback(() => {
		(async () => {
			try {
				await trigger({
					params: {
						shipment_id: shipmentId,
					},
				});
			} catch (error) {
				console.error(error);
			}
		})();
	}, [shipmentId, trigger]);

	useEffect(() => {
		getSaasContainerSubscription();
	}, [getSaasContainerSubscription]);

	return {
		loading,
		data,
	};
};

export default useGetSaasContainerSubscription;
