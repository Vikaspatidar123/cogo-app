import { useState, useEffect, useCallback } from 'react';

import { useRequestBf } from '@/packages/request';
import { useSelector } from '@/packages/store';
import useSearchQuery from '@/ui/commons/utils/useSearchQuery';

const useListQuote = () => {
	const { organization = {}, id = '' } = useSelector(((state) => state.profile));

	const [pagination, setPagination] = useState(1);
	const [sortObj, setSortObj] = useState();
	const [filters, setFilters] = useState({});
	const [searchTerm, setSearchTerm] = useState();
	const { debounceQuery, query } = useSearchQuery();
	const filterLength = Object.keys(filters).length;

	const [{ loading: sendListLoading, data: sentListData }, sentlistTrigger] = useRequestBf({
		method  : 'get',
		url     : '/saas/quote/list',
		authKey : 'get_saas_quote_list',
	}, { manual: true });

	// const [{ loading: receivedLoading }, receivedListtrigger] = useRequestBf({
	// 	method  : 'get',
	// 	url     : '/saas/quote/received/list',
	// 	authKey : 'get_saas_quote_received_list',
	// }, { manual: true });

	const [{ loading: summaryLoading, data: summaryData }, summarytrigger] = useRequestBf({
		method  : 'get',
		url     : 'saas/quote/summary',
		authKey : 'get_saas_quote_summary',
	}, { manual: true });

	const [{ loading: deleteLoading }, deleteTrigger] = useRequestBf({
		method  : 'delete',
		url     : 'saas/quote',
		authKey : 'delete_saas_quote',
	}, { manual: true });

	const refetchList = useCallback(async () => {
		const { status, date_range, showExpired, expiresIn } = filters || {};
		const { sortType, sortBy } = sortObj || {};
		try {
			await sentlistTrigger({
				params: {
					organizationId : organization?.id,
					page           : pagination,
					pageLimit      : 10,
					status,
					startDate      : date_range?.startDate,
					endDate        : date_range?.endDate,
					searchTerm     : query,
					sortType       : sortType ? 'ASC' : 'DESC',
					sortBy,
					showExpired    : showExpired || undefined,
					expiresIn      : expiresIn || undefined,
				},
			});
		} catch (err) {
			console.log(err);
		}
	}, [filters, organization?.id, pagination, query, sentlistTrigger, sortObj]);

	const refetchSummary = useCallback(async () => {
		const { status, date_range, showExpired, expiresIn } = filters || {};
		try {
			await summarytrigger({
				params: {
					organizationId : organization.id,
					searchTerm     : query,
					status,
					startDate      : date_range?.startDate,
					endDate        : date_range?.endDate,
					showExpired    : showExpired || undefined,
					expiresIn      : expiresIn || undefined,
				},
			});
		} catch (err) {
			console.log(err);
		}
	}, [filters, organization.id, query, summarytrigger]);

	const deleteQuote = async (quoteId) => {
		try {
			const resp = await deleteTrigger({
				params: {
					userId      : id,
					quotationId : quoteId,
				},
			});

			if (resp?.data?.message === 'Success') {
				await refetchList();
				await refetchSummary();
			}
		} catch (err) {
			console.log(err);
		}
	};

	useEffect(() => {
		refetchSummary();
	}, [refetchSummary]);

	useEffect(() => {
		refetchList();
	}, [pagination, refetchList]);

	useEffect(() => {
		if (sortObj || filterLength > 0 || (query !== undefined && query !== null)) {
			if (pagination > 1) {
				setPagination(1);
			} else {
				refetchList();
			}
		}
		if (filterLength > 0 || (query !== undefined && query !== null)) {
			refetchSummary();
		}
	}, [JSON.stringify(sortObj), JSON.stringify(filters), query]);

	useEffect(() => {
		if (searchTerm !== undefined && searchTerm !== null) {
			debounceQuery(searchTerm);
		}
	}, [debounceQuery, searchTerm]);

	return {
		pagination,
		setPagination,
		setSortObj,
		setFilters,
		filters,
		sentListData,
		sendListLoading,
		searchTerm,
		setSearchTerm,
		summaryLoading,
		summaryData,
		deleteQuote,
		deleteLoading,
	};
};

export default useListQuote;
