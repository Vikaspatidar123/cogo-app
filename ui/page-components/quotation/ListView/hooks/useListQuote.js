import { format } from '@cogoport/utils';
import { useState, useEffect, useCallback } from 'react';

import { useRequestBf } from '@/packages/request';
import { useSelector } from '@/packages/store';
import useSearchQuery from '@/ui/commons/utils/useSearchQuery';

const useListQuote = () => {
	const { organization = {}, id = '' } = useSelector(((state) => state.profile));

	const [globalFilter, setGlobalFilter] = useState({
		page      : 1,
		pageLimit : 10,
		query     : '',
	});

	const { debounceQuery, query } = useSearchQuery();

	const [{ loading: sendListLoading, data: sentListData }, sentlistTrigger] = useRequestBf({
		method  : 'get',
		url     : '/saas/quote/list',
		authKey : 'get_saas_quote_list',
	}, { manual: true });

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
		const { sortBy, sortType, page, filters: gloFilter = {}, q } = globalFilter;
		const { status = '', showExpired = false, date_range = {}, expiresIn = '' } = gloFilter;
		const { startDate, endDate } = date_range;
		try {
			await sentlistTrigger({
				params: {
					organizationId : organization?.id,
					page,
					pageLimit      : 10,
					status,
					startDate      : startDate ? format(startDate, 'dd MMM yyyy') : undefined,
					endDate        : endDate ? format(endDate, 'dd MMM yyyy') : undefined,
					searchTerm     : q,
					sortType       : sortType ? 'ASC' : 'DESC',
					sortBy,
					showExpired    : showExpired || undefined,
					expiresIn      : expiresIn || undefined,
				},
			});
		} catch (err) {
			console.log(err, 'er');
		}
	}, [globalFilter, organization, sentlistTrigger]);

	const refetchSummary = useCallback(async () => {
		const { filters, q } = globalFilter;
		const { status, date_range = {}, showExpired, expiresIn } = filters || {};
		const { startDate, endDate } = date_range;

		try {
			await summarytrigger({
				params: {
					organizationId : organization.id,
					searchTerm     : q,
					status,
					startDate      : startDate ? format(startDate, 'dd MMM yyyy') : undefined,
					endDate        : endDate ? format(endDate, 'dd MMM yyyy') : undefined,
					showExpired    : showExpired || undefined,
					expiresIn      : expiresIn || undefined,
				},
			});
		} catch (err) {
			console.log(err);
		}
	}, [globalFilter, organization, summarytrigger]);

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
		if (query !== undefined) {
			setGlobalFilter((prev) => ({
				...prev,
				q    : query,
				page : 1,
			}));
		}
	}, [query]);

	useEffect(() => {
		if (globalFilter) {
			refetchList();
		}
	}, [globalFilter, refetchList]);

	return {
		sentListData,
		sendListLoading,
		summaryLoading,
		summaryData,
		deleteQuote,
		deleteLoading,
		setGlobalFilter,
		globalFilter,
		debounceQuery,
	};
};

export default useListQuote;
