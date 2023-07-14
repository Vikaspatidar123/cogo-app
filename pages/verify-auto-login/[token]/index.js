import { Toast } from '@cogoport/components';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import getRedirectionUrlForAutoLoginSignup from '@/ui/helpers/getRedirectionUrlForAutoLoginSignup';
import VerifyAutoLogin from '@/ui/page-components/authentication/components/VerifyAutoLogin';
import getVerifyAutoLogin from '@/ui/page-components/authentication/hooks/useVerifyAutoLogin';

export async function getServerSideProps(ctx) {
	const { query, locale } = ctx;
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
		getRedirectionUrlForAutoLoginSignup({ response, lead_action_id, ctx, actionType: 'autoLogin' });
	} catch (e) {
		Toast.error('Something went wrong, we are working on it!');
	}

	return {
		props: {
			...(await serverSideTranslations(locale, ['common', 'verifyAutoLogin'])),

		},
	};
}

export default VerifyAutoLogin;
