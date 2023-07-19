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

		getRedirectionUrlForAutoLoginSignup({ response, lead_action_id, ctx, actionType: 'autoSignUp' });
	} catch (e) {
		console.error(e.toString());
	}

	return 	{
		props: {
			...(await serverSideTranslations(locale, ['common', 'verifyAutoLogin'])),

		},
	};
}

export default VerifyAutoSignUpEmail;
