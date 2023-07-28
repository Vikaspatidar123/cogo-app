import { isEmpty } from '@cogoport/utils';
import { setCookie } from 'cookies-next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import AcceptUser from '@/ui/page-components/accept-user';
import acceptPassword from '@/ui/page-components/accept-user/useAcceptPassword';

export async function getServerSideProps(ctx) {
	const { query, locale } = ctx;
	const { id } = query;
	let errorMessage = false;
	try {
		const res = await acceptPassword({ token: id });

		if (!isEmpty(res)) {
			const { token } = (res || {}).data || {};

			setCookie(process.env.NEXT_PUBLIC_AUTH_TOKEN_NAME, token, ctx);

			return {
				props    : {},
				redirect : {
					destination : '/onboarding?from_signup=true',
					permanent   : false,
				},
			};
		}
		errorMessage = true;
	} catch (e) {
		errorMessage = true;
	}
	return {
		props: {
			...(await serverSideTranslations(locale, ['common'])),
			errorMessage,

		},
	};
}

export default AcceptUser;
