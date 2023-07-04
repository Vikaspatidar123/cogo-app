import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import setCookieAndRedirect from '@/ui/commons/utils/setCookieAndRedirect';
import getVerifyEmail from '@/ui/page-components/authentication/hooks/useVerifyEmail';
import { VerifyEmail } from '@/ui/page-components/authentication/index';

export async function getServerSideProps(ctx) {
	const { query, locale } = ctx;
	const { id } = query;
	try {
		const res = await getVerifyEmail({ email_token: id });
		const { hasError } = res || {};
		if (!hasError) {
			const { token } = (res || {}).data || {};
			const redirectPath = '/onboarding?from_signup=true';
			setCookieAndRedirect(token, ctx, redirectPath);
		}
	} catch (e) {
		console.log(e.toString());
	}
	return {
		layout : 'none',
		props  : {
			...(await serverSideTranslations(locale, ['common', 'verifyAutoLogin'])),

		},
	};
}

export default VerifyEmail;
