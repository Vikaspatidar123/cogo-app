// import { useRequest } from '@cogo/commons/hooks';
// import { useSelector } from '@cogo/store';
import { useCallback, useEffect, useState } from 'react';

import { useRequest } from '@/packages/request';
import { useSelector } from '@/packages/store';

const useGetSageArInvoices = () => {
	const {
		general: { query = {} },
	} = useSelector((state) => state);

	const { token } = query || {};
	const [params, setParams] = useState({
		page                     : 1,
		page_limit               : 10,
		pagination_data_required : true,
	});
	const [orderBy, setOrderBy] = useState({
		key   : '',
		order : '',
	});
	const [searchQuery, setSearchQuery] = useState();
	const [salesAgentId, setSalesAgentId] = useState('');

	const [{ data, loading }, trigger] = useRequest({
		url    : '/get_dunning_additional_data',
		method : 'post',
	}, { manual: true });

	const fetchInvoiceList = useCallback(async () => {
		try {
			await trigger({
				data: {
					...params,
					page_limit    : 6,
					data_required : 'invoice',
					sort_type     : orderBy.order || undefined,
					sort_by       : orderBy.key || undefined,
					token,
					filters       : {
						q              : searchQuery || undefined,
						sales_agent_id : salesAgentId || undefined,
						is_precovid    : 'NO',
					},
				},
			});
		} catch (error) {
			console.error(error);
		}
	}, [orderBy, params, salesAgentId, searchQuery, token, trigger]);

	useEffect(() => {
		fetchInvoiceList();
	}, [params.page, orderBy, searchQuery, salesAgentId, fetchInvoiceList]);

	return {
		loading,
		data: data || {},
		params,
		setParams,
		setOrderBy,
		orderBy,
		setSearchQuery,
		searchQuery,
		setSalesAgentId,
		salesAgentId,
	};
};

export default useGetSageArInvoices;
