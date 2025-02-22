import { getByKey } from '@cogoport/utils';

import {
	PAGE_MAPPINGS,
} from '@/ui/commons/constants/pageMappings';

const getRedirectionUrlForAutoLoginSignup = ({ response, lead_action_id, actionType = '' }) => {
	const pageUrl = PAGE_MAPPINGS?.[actionType] || null;

	const {
		lead_action = {},
		organization_id,
		organization_branch_id,
		user_id,
	} = getByKey(response, 'data') || {};

	const redirect_page = lead_action?.action_config?.redirect_page || '';

	let url = `/${organization_id}/${organization_branch_id}/${pageUrl?.[redirect_page]}`;
	if (redirect_page === 'search_results') {
		const queryObj = {
			importer_exporter_id        : organization_id,
			importer_exporter_branch_id : organization_branch_id,
			user_id,
			lead_action_id,
		};

		url = `${url}?query=${JSON.stringify(queryObj)}`;
	}

	if (['app_dashboard', 'app_discover_rates'].includes(redirect_page)
            && lead_action?.action_config?.search_mode === 'generic_search'
	) {
		url = `${url}?service_type=${lead_action?.action_config?.service_type}`;
	}

	return url;
};

export default getRedirectionUrlForAutoLoginSignup;
