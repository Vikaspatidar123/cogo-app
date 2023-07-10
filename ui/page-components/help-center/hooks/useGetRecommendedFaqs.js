/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback } from 'react';

import { NO_OF_FAQS_TO_BE_FETCHED } from '../constants';

import { useRequest } from '@/packages/request';
import { useSelector } from '@/packages/store';

const getParams = ({ query = '', cogo_entity_id = '', country_id = '' }) => ({
	filters: {
		persona    : 'importer_exporter',
		cogo_entity_id,
		platform   : 'app',
		work_scope : 'all',
		country_id,
		status     : 'active',
		state      : 'published',
		q          : query,
	},
	page_limit: NO_OF_FAQS_TO_BE_FETCHED,
});

function useGetRecommendedFaqs() {
	const { cogo_entity_id = '', country_id = '' } = useSelector((state) => state.profile.organization);

	const [{ loading, data }, trigger] = useRequest({
		url    : '/cogo_academy/list_faq_questions',
		method : 'get',
	}, { manual: false });

	const getRecommendedFaqs = useCallback(
		(query) => {
			try {
				trigger({
					params: getParams({
						query,
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

	return {
		getRecommendedFaqs,
		recommendedFaqs    : data || {},
		recommendedLoading : loading || false,
	};
}

export default useGetRecommendedFaqs;
