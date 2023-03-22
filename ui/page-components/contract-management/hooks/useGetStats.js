import { useEffect } from 'react';
import { useSelector } from '@cogo/store';
import useRequest from '@cogo/commons/hooks/useRequest';
import { toast } from '@cogoport/front/components';
import { getApiErrorString } from '@cogoport/front/utils';

const useGetStats = () => {
	const {
		general: { scope },
	} = useSelector((state) => state);

	const { trigger, data, loading } = useRequest(
		'get',
		false,
		scope,
	)('/get_contract_stats');

	const getStats = async () => {
		try {
			await trigger({
				params: {
					filters: {
						service_types: ['fcl_freight', 'lcl_freight', 'air_freight'],
						movement_type: ['international'],
					},
				},
			});
		} catch (error) {
			toast.error(getApiErrorString(error));
		}
	};

	useEffect(() => {
		getStats();
	}, []);

	return {
		data,
		loading,
	};
};
export default useGetStats;
