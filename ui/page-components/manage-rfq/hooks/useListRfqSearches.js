import { useEffect, useState } from 'react';
import { useCallback } from 'react/cjs/react.production.min';

import { useRequest } from '@/packages/request';

const useListRfqSearches = ({
	rfq_id,
	listFilters,
	setActivePortPair = () => {},
	setShowModal = () => {},
}) => {
	const [portPairList, setPortPairList] = useState([]);
	const listFiltersDependency = JSON.stringify(listFilters);
	const {
		search_type = 'all',
		rateFilter = '',
		location = '',
	} = listFilters || {};

	const isNewRate = rateFilter === 'is_new_rates';

	const [{ data, loading }, trigger] = useRequest({
		method : 'get',
		url    : '/list_rfq_searches',
	}, { manual: true });

	const listRfqSearches = useCallback(async () => {
		const response = await trigger({
			params: {
				page                     : 1,
				page_limit               : 1000,
				service_data_required    : true,
				list_count_data_required : true,
				[rateFilter]             : !isNewRate ? true : undefined,
				checkout_data_required   : true,
				filters                  : {
					negotiation_reverts_count_greater_than : isNewRate ? 0 : undefined,
					search_type                            : search_type === 'all' ? undefined : search_type,
					location_id                            : location || undefined,
					rfq_id,
				},
			},
		});
		if (response?.data) {
			setPortPairList(response.data.list);
			setActivePortPair(0);
			setShowModal(response.data.contract_guide_view ? 'whyModal' : '');
		}
	}, [isNewRate, location, rateFilter, rfq_id, search_type, setActivePortPair, setShowModal, trigger]);

	useEffect(() => {
		listRfqSearches();
	}, [rfq_id, listFiltersDependency, listRfqSearches]);

	return {
		portPairloading : loading,
		portPairList,
		stats           : data?.stats || {},
	};
};

export default useListRfqSearches;
