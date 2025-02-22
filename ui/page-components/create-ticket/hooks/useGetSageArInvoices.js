import { useCallback, useEffect, useState } from 'react';

import { useRouter } from '@/packages/next';
import { useRequest } from '@/packages/request';

const PAGE_LIMIT = 6;
const DEFAULT_PAGE_LIMIT = 10;
const DEFAULT_PAGE = 1;

const useGetSageArInvoices = () => {
	const { query } = useRouter();

	const { token } = query || {};

	const [params, setParams] = useState({
		page                     : DEFAULT_PAGE,
		page_limit               : DEFAULT_PAGE_LIMIT,
		pagination_data_required : true,
	});

	const [orderBy, setOrderBy] = useState({
		key   : '',
		order : '',
	});
	const [searchQuery, setSearchQuery] = useState(' ');
	const [salesAgentId, setSalesAgentId] = useState('');

	const [{ data, loading }, trigger] = useRequest({
		url    : '/get_dunning_additional_data',
		method : 'post',
	}, { manual: true });

	const createPayload = useCallback(() => ({
		...params,
		page_limit    : PAGE_LIMIT,
		data_required : 'invoice',
		sort_type     : orderBy.order || undefined,
		sort_by       : orderBy.key || undefined,
		token,
		filters       : {
			q              : searchQuery || undefined,
			sales_agent_id : salesAgentId || undefined,
			is_precovid    : 'NO',
		},
	}), [orderBy, params, salesAgentId, searchQuery, token]);

	const fetchInvoiceList = useCallback(async () => {
		const payload = createPayload();
		try {
			await trigger({
				data: payload,
			});
		} catch (error) {
			console.error(error);
		}
	}, [createPayload, trigger]);

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
