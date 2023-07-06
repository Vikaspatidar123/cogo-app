/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useCallback } from 'react';

import { useDebounceQuery } from '@/packages/forms';
import { useRequest } from '@/packages/request';
import { useSelector } from '@/packages/store';

function useListFaqQuestions({ selectedQuery = '' }) {
	const { general: { scope = '' }, profile } = useSelector((state) => state);

	const { debounceQuery, query: searchQuery = '' } = useDebounceQuery();

	const [{ loading, data }, trigger] = useRequest({
		url    : '/cogo_academy/list_faq_questions',
		method : 'get',
		scope,
	}, { manual: false });

	const fetchFaqQuestions = useCallback(async () => {
		try {
			await trigger({
				params: {
					filters: {
						persona        : 'importer_exporter',
						cogo_entity_id : profile?.organization?.cogo_entity_id,
						platform       : 'app',
						work_scope     : 'all',
						country_id     : profile?.organization?.country_id,
						q              : searchQuery,
					},
				},
			});
		} catch (error) {
			console.log('error', error);
		}
	}, [trigger]);

	useEffect(() => {
		if (searchQuery) {
			fetchFaqQuestions();
		}
	}, [searchQuery]);

	useEffect(() => {
		debounceQuery(selectedQuery);
	}, [selectedQuery]);

	return {
		faqListData: data || {},
		loading,
	};
}

export default useListFaqQuestions;
