import { useEffect, useCallback } from 'react';

import { useRequest } from '@/packages/request';

const API_MAPPINR = {
	air   : '/get_saas_air_subscription',
	ocean : '/get_saas_container_subscription',
};
const getPayload = ({ id }) => ({
	shipment_id: id,
});
const useGetSaasContainerSubscription = ({
	id = '',
	shipmentType,
}) => {
	const [{ loading, data }, trigger] = useRequest({
		url    : API_MAPPINR[shipmentType],
		method : 'GET',
	}, { manual: true });

	const getSaasContainerSubscription = useCallback(() => {
		(async () => {
			const payload = getPayload({ id });
			try {
				await trigger({
					params: payload,
				});
			} catch (error) {
				console.error(error);
			}
		})();
	}, [id, trigger]);

	useEffect(() => {
		getSaasContainerSubscription();
	}, [getSaasContainerSubscription]);

	return {
		loading,
		data,
	};
};

export default useGetSaasContainerSubscription;
