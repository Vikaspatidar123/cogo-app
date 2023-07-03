import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import setCookieAndRedirect from '@/ui/commons/utils/setCookieAndRedirect';
import getVerifyAutoSignUpEmail from '@/ui/page-components/authentication/hooks/useVerifyAutoSignUpEmail';
import { VerifyAutoSignUpEmail } from '@/ui/page-components/authentication/index';

const PAGE_MAPPINGS = {
	app_discover_rates : 'book',
	search_results     : 'book-deep-link',
	app_dashboard      : 'dashboard',
};

export async function getServerSideProps(ctx) {
	const { query, locale } = ctx;
	const {
		token: email_token,
		lead_user_id,
		lead_organization_id,
		lead_action_id,
	} = query;

	try {
		const response = await getVerifyAutoSignUpEmail({
			email_token,
			lead_user_id,
			lead_organization_id,
			lead_action_id,
		});

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
			// redirect_page = 'search_results';

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

			if (
				['app_dashboard', 'app_discover_rates'].includes(redirect_page)
        && lead_action?.action_config?.search_mode === 'generic_search'
			) {
				uri = `${uri}?service_type=${lead_action?.action_config?.service_type}`;
			}

			setCookieAndRedirect(token, ctx, uri);
		}
	} catch (e) {
		// toast.error('Something went wrong, we are working on it!');
		console.log(e.toString());
	}

	return 	{
		layout : 'none',
		props  : {
			...(await serverSideTranslations(locale, ['common', 'verifyAutoLogin'])),

		},
	};
}

export default VerifyAutoSignUpEmail;
