/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useCallback, useState } from 'react';

import { NO_OF_QUESTIONS_TO_BE_FETCHED } from '../constants';

import { useRequest } from '@/packages/request';
import { useSelector } from '@/packages/store';

const getParams = ({ page = 1, cogo_entity_id = '', country_id = '', topicId = '' }) => ({
	filters: {
		persona      : 'importer_exporter',
		cogo_entity_id,
		platform     : 'app',
		work_scope   : 'all',
		status       : 'active',
		state        : 'published',
		country_id,
		faq_topic_id : topicId,
	},
	page_limit: NO_OF_QUESTIONS_TO_BE_FETCHED,
	page,
});

function useListFaqTopicQuestions({ topicId = '' }) {
	const { cogo_entity_id = '', country_id = '' } = useSelector((state) => state.profile.organization);

	const [currentPage, setCurrentPage] = useState(1);

	const [{ loading, data }, trigger] = useRequest({
		url    : '/cogo_academy/list_faq_questions',
		method : 'get',
	}, { manual: false });

	const fetchFaqTopicQuestions = useCallback(
		async ({ page = 1 }) => {
			if (!topicId) {
				return;
			}

			try {
				await trigger({
					params: getParams({
						page,
						cogo_entity_id,
						country_id,
						topicId,
					}),
				});

				setCurrentPage(page);
			} catch (error) {
				console.error(error);
			}
		},
		[trigger, topicId],
	);

	useEffect(() => {
		fetchFaqTopicQuestions({});
	}, [fetchFaqTopicQuestions]);

	return {
		faqListTopicData : data || {},
		topicLoading     : loading,
		currentPage,
		setCurrentPage,
		fetchFaqTopicQuestions,
	};
}

export default useListFaqTopicQuestions;
