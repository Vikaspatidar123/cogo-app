import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import setCookieAndRedirect from '@/ui/commons/utils/setCookieAndRedirect';
import AcceptUser from '@/ui/page-components/accept-user';
import acceptPassword from '@/ui/page-components/accept-user/useAcceptPassword';

export async function getServerSideProps(ctx) {
	const { query, locale } = ctx;
	const { id } = query;
	let errorMessage = false;
	try {
		const res = await acceptPassword({ token: id });
		const { hasError } = res || {};

		if (!hasError) {
			const { token } = (res || {}).data || {};
			setCookieAndRedirect(token, ctx, '/onboarding?from_signup=true');
		} else {
			errorMessage = true;
		}
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
