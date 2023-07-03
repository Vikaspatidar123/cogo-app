import { Toast } from '@cogoport/components';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import setCookieAndRedirect from '@/ui/commons/utils/setCookieAndRedirect';
import VerifyAutoLogin from '@/ui/page-components/authentication/components/VerifyAutoLogin';
import getVerifyAutoLogin from '@/ui/page-components/authentication/hooks/useVerifyAutoLogin';

const PAGE_MAPPINGS = {
	app_discover_rates  : 'book',
	search_results      : 'book-deep-link',
	app_dashboard       : 'dashboard',
	manage_subscription : 'saas/cogo-subscriptions/manage-subscription',
	payment_dashboard   : 'payment-dashboard',
	shipments           : 'shipments',
};

export async function getServerSideProps({ locale }) {
	return {
		props: {
			...(await serverSideTranslations(locale, ['common', 'verifyAutoLogin'])),

		},
	};
}

VerifyAutoLogin.getInitialProps = async (ctx) => {
	const { query } = ctx;
	const {
		token: auth_token,
		lead_user_id,
		lead_organization_id,
		lead_action_id,
	} = query;

	try {
		const response = await getVerifyAutoLogin({
			token: auth_token,
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
		Toast.error('Something went wrong, we are working on it!');

		// Toast(e.toString());
	}

	return { layout: 'none' };
};

export default VerifyAutoLogin;
