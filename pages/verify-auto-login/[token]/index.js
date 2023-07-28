import { Toast } from '@cogoport/components';
import { getByKey } from '@cogoport/utils';
import { setCookie } from 'cookies-next';
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
		const {
			token,
		} = getByKey(response, 'data') || {};

		const url = getRedirectionUrlForAutoLoginSignup({ response, lead_action_id, actionType: 'autoLogin' });

		if (token) {
			setCookie(process.env.NEXT_PUBLIC_AUTH_TOKEN_NAME, token, ctx);
			return {
				props    : {},
				redirect : {
					destination : url,
					permanent   : false,
				},
			};
		}
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
