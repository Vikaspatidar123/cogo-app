import { useCallback } from 'react';

import { NO_OF_FAQS_TO_BE_FETCHED } from '../constants';

import { useRequest } from '@/packages/request';
import { useSelector } from '@/packages/store';

const getParams = ({ query, parent_entity_id, country_id }) => ({
	filters: {
		persona        : 'importer_exporter',
		cogo_entity_id : parent_entity_id,
		platform       : 'partner',
		work_scope     : 'all',
		country_id,
		status         : 'active',
		state          : 'published',
		q              : query,
	},
	page_limit: NO_OF_FAQS_TO_BE_FETCHED,
});

function useGetRecommendedFaqs() {
	const { profile } = useSelector((state) => state);

	const { organization: { parent_entity_id, country_id } = {} } = profile || {};

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

	return {
		getRecommendedFaqs,
		recommendedFaqs    : data || {},
		recommendedLoading : loading || false,
	};
}

export default useGetRecommendedFaqs;
