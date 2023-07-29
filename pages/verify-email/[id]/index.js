import { setCookie } from 'cookies-next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import { VerifyEmail } from '@/ui/page-components/authentication';
import getVerifyEmail from '@/ui/page-components/authentication/hooks/useVerifyEmail';

export async function getServerSideProps(ctx) {
	const { query, locale } = ctx;
	const { id } = query;

	try {
		const res = await getVerifyEmail({ email_token: id });

		const { token } = (res || {}).data || {};

		const redirectPath = '/dashboard?mode=set_password';

		setCookie(process.env.NEXT_PUBLIC_AUTH_TOKEN_NAME, token, ctx);

		return {
			props    : {},
			redirect : {
				destination : redirectPath,
				permanent   : false,
			},
		};
	} catch (e) {
		console.error(e.toString());
	}
	return {
		props: {
			...(await serverSideTranslations(locale, ['common', 'authentication', 'verifyAutoLogin'])),

		},
	};
}

export default VerifyEmail;
