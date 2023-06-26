import { useEffect, useCallback } from 'react';

import { NO_OF_QUESTIONS_TO_BE_FETCHED } from '../constants';

import { useDebounceQuery } from '@/packages/forms';
import { useRequest } from '@/packages/request';
import { useSelector } from '@/packages/store';

const getParams = ({ searchQuery, parent_entity_id, country_id }) => ({
	filters: {
		persona        : 'importer_exporter',
		cogo_entity_id : parent_entity_id,
		platform       : 'app',
		status         : 'active',
		state          : 'published',
		work_scope     : 'all',
		country_id,
		q              : searchQuery,
	},
	page_limit: NO_OF_QUESTIONS_TO_BE_FETCHED,
});

function useListFaqQuestions({ selectedQuery = '' }) {
	const { profile } = useSelector((state) => state);

	const { organization: { parent_entity_id, country_id } = {} } = profile || {};

	const [{ loading, data }, trigger] = useRequest({
		url    : '/cogo_academy/list_faq_questions',
		method : 'get',
	}, { manual: false });

	const { debounceQuery, query = '' } = useDebounceQuery();

	const fetchFaqQuestions = useCallback(
		(searchQuery = '') => {
			try {
				trigger({
					params: getParams({
						searchQuery,
						parent_entity_id,
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
	}, [fetchFaqQuestions, query]);

	useEffect(() => {
		debounceQuery(selectedQuery);
	}, [selectedQuery, debounceQuery]);

	return {
		faqListData: data || '',
		loading,
	};
}

export default useListFaqQuestions;
