/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useEffect } from 'react';

import { NO_OF_FAQS_TO_BE_FETCHED } from '../constants';

import { useRequest } from '@/packages/request';
import { useSelector } from '@/packages/store';

const getParams = ({ profile }) => ({
	filters: {
		user_id : profile?.id,
		status  : 'active',
	},
	get_faq_question_data : true,
	page_limit            : NO_OF_FAQS_TO_BE_FETCHED,
});

function useListFaqSearchHistory() {
	const { profile } = useSelector((state) => state);

	const [{ loading, data }, trigger] = useRequest({
		url    : '/cogo_academy/list_faq_question_user_stats',
		method : 'get',
	}, { manual: false });

	const getFaqSearchHistory = useCallback(() => {
		try {
			trigger({
				params: getParams({ profile }),
			});
		} catch (error) {
			console.error(error);
		}
	}, [trigger]);

	useEffect(() => {
		getFaqSearchHistory();
	}, [getFaqSearchHistory]);

	return {
		recentQueries        : data || {},
		recentQueriesLoading : loading || false,
	};
}

export default useListFaqSearchHistory;
