import { useCallback, useEffect } from 'react';

import {
	NO_OF_TOPICS_TO_BE_SHOWN,
	MAXIMUM_TOPICS_TO_BE_FETCHED,
} from '../constants';

import { useRequest } from '@/packages/request';
import { useSelector } from '@/packages/store';

const getParams = ({ listAll, cogo_entity_id = '', country_id = '' }) => {
	const pageLimit = listAll
		? MAXIMUM_TOPICS_TO_BE_FETCHED
		: NO_OF_TOPICS_TO_BE_SHOWN;

	return {
		filters: {
			status  : 'active',
			state   : 'published',
			cogo_entity_id,
			country_id,
			persona : 'importer_exporter',
		},
		sort_by    : 'view_count',
		page       : 1,
		page_limit : pageLimit,
	};
};

const useListFaqTopics = ({ listAll = false }) => {
	const { cogo_entity_id = '', country_id = '' } = useSelector((state) => state.profile.organization);

	const [{ loading, data }, trigger] = useRequest({
		url    : '/cogo_academy/list_faq_topics',
		method : 'get',
	}, { manual: false });

	const getFaqTopics = useCallback(() => {
		try {
			trigger({
				params: getParams({
					listAll,
					cogo_entity_id,
					country_id,
				}),
			});
		} catch (err) {
			console.error(err);
		}
	}, [country_id, listAll, cogo_entity_id, trigger]);

	useEffect(() => {
		getFaqTopics();
	}, [getFaqTopics]);

	return { loading, faqTopics: data || {} };
};
export default useListFaqTopics;
