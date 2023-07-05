import { AUTO_SIGNUP_PAGE_MAPPINGS, AUTO_LOGIN_PAGE_MAPPINGS } from '@/ui/commons/constants/pageMappings';
import setCookieAndRedirect from '@/ui/commons/utils/setCookieAndRedirect';

const getRedirectionUrlForAutoLoginSignup = ({ response, lead_action_id, ctx, actionType = '' }) => {
	const PAGE_MAPPINGS = actionType === 'autoSignUp' ? AUTO_SIGNUP_PAGE_MAPPINGS : AUTO_LOGIN_PAGE_MAPPINGS;

	const { hasError } = response || {};

	if (!hasError) {
		const {
			token,
			lead_action = {},
			organization_id,
			organization_branch_id,
			user_id,
		} = (response || {}).data || {};

		const redirect_page = lead_action?.action_config?.redirect_page || '';

		let uri = `/${organization_id}/${organization_branch_id}/${PAGE_MAPPINGS?.[redirect_page]}`;
		if (redirect_page === 'search_results') {
			const queryObj = {
				importer_exporter_id        : organization_id,
				importer_exporter_branch_id : organization_branch_id,
				user_id,
				lead_action_id,
			};

			uri = `${uri}?query=${JSON.stringify(queryObj)}`;
		}

		if (['app_dashboard', 'app_discover_rates'].includes(redirect_page)
            && lead_action?.action_config?.search_mode === 'generic_search'
		) {
			uri = `${uri}?service_type=${lead_action?.action_config?.service_type}`;
		}

		setCookieAndRedirect(token, ctx, uri);
	}
};

export default getRedirectionUrlForAutoLoginSignup;
