import { useEffect, useState } from 'react';
import { useCallback } from 'react/cjs/react.production.min';

import { useRequest } from '@/packages/request';

const useGetRfqSearch = ({
	portPairloading,
	spot_searches,
	activePortPair,
}) => {
	const spot_search = spot_searches[activePortPair] || {};
	const rfq_id = spot_search?.rfq_id || '';
	const serial_id = spot_search?.serial_id || '';
	const id = spot_search?.id || '';

	const [portPairRates, setPortPairRates] = useState([]);

	const [{ loading }, trigger] = useRequest(
		{
			method : 'get',
			url    : '/get_rfq_search',
		},
		{ manual: true },
	);

	const getRefSearch = async () => {
		const response = await trigger({
			params: {
				rfq_id,
				rfq_search_id: id,
			},
		});
		if (response?.data) {
			setPortPairRates(response.data);
		}
	};

	useEffect(() => {
		if (serial_id && !portPairloading && spot_searches) {
			getRefSearch();
		}
	}, [id, activePortPair]);

	return {
		portPairRateloading: loading,
		portPairRates,
	};
};

export default useGetRfqSearch;
