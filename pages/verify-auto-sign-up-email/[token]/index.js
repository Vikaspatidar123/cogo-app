import { getByKey } from '@cogoport/utils';
import { setCookie } from 'cookies-next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import getRedirectionUrlForAutoLoginSignup from '@/ui/helpers/getRedirectionUrlForAutoLoginSignup';
import getVerifyAutoSignUpEmail from '@/ui/page-components/authentication/hooks/useVerifyAutoSignUpEmail';
import { VerifyAutoSignUpEmail } from '@/ui/page-components/authentication/index';

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

		const {
			token,
		} = getByKey(response, 'data') || {};

		const url = getRedirectionUrlForAutoLoginSignup({ response, lead_action_id, actionType: 'autoSignUp' });

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
		console.error(e.toString());
	}

	return {
		props: {
			...(await serverSideTranslations(locale, ['common', 'verifyAutoLogin'])),
		},
	};
}

export default VerifyAutoSignUpEmail;
