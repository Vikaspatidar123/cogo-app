import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import setCookieAndRedirect from '@/ui/commons/utils/setCookieAndRedirect';
import { VerifyEmail } from '@/ui/page-components/authentication';
import getVerifyEmail from '@/ui/page-components/authentication/hooks/useVerifyEmail';

export async function getServerSideProps(ctx) {
	const { query, locale } = ctx;
	const { id } = query;

	try {
		const res = await getVerifyEmail({ email_token: id });

		const { token } = (res || {}).data || {};
		const redirectPath = `/dashboard?mail_verify=${true}`;
		setCookieAndRedirect(token, ctx, redirectPath);
	} catch (e) {
		console.log(e.toString());
	}
	return {
		props: {
			...(await serverSideTranslations(locale, ['common', 'authentication'])),

		},
	};
}

export default VerifyEmail;
