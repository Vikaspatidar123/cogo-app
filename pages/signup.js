import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import GLOBAL_CONSTANTS from '@/ui/commons/constants/globals';
import { Signup } from '@/ui/page-components/authentication';

export async function getServerSideProps(ctx) {
	const { locale } = ctx;
	let IP_CLIENT = ctx?.req?.headers['x-forwarded-for'] || null;

	if (IP_CLIENT?.includes(',')) {
		IP_CLIENT = IP_CLIENT?.split(',')?.[GLOBAL_CONSTANTS.zeroth_index] || null;
	}
	return {
		props: {
			...(await serverSideTranslations(locale, ['common', 'authentication'])),
			IP_CLIENT,
		},
	};
}
export default Signup;
