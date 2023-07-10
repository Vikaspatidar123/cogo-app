/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useCallback } from 'react';

import { NO_OF_QUESTIONS_TO_BE_FETCHED } from '../constants';

import { useDebounceQuery } from '@/packages/forms';
import { useRequest } from '@/packages/request';
import { useSelector } from '@/packages/store';

const getParams = ({ searchQuery, cogo_entity_id, country_id }) => ({
	filters: {
		persona    : 'importer_exporter',
		cogo_entity_id,
		platform   : 'app',
		status     : 'active',
		state      : 'published',
		work_scope : 'all',
		country_id,
		q          : searchQuery,
	},
	page_limit: NO_OF_QUESTIONS_TO_BE_FETCHED,
});

function useListFaqQuestions({ selectedQuery = '' }) {
	const { cogo_entity_id = '', country_id = '' } = useSelector((state) => state.profile.organization);

	const [{ loading, data }, trigger] = useRequest({
		url    : '/cogo_academy/list_faq_questions',
		method : 'get',
	}, { manual: false });

	const { query, debounceQuery } = useDebounceQuery();

	const fetchFaqQuestions = useCallback(
		(searchQuery = '') => {
			try {
				trigger({
					params: getParams({
						searchQuery,
						cogo_entity_id,
						country_id,
					}),
				});
			} catch (error) {
				console.error(error);
			}
		},
		[trigger],
	);

	useEffect(() => {
		if (query) {
			fetchFaqQuestions(query);
		}
	}, [query]);

	useEffect(() => {
		debounceQuery(selectedQuery);
	}, [debounceQuery, selectedQuery]);

	return {
		faqListData: data || '',
		loading,
	};
}

export default useListFaqQuestions;
