import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import { ForgotPassword } from '@/ui/page-components/authentication';

export async function getServerSideProps({ locale }) {
	return {
		props: {
			...(await serverSideTranslations(locale, ['common', 'forgotPassword'])),

		},
	};
}
export default ForgotPassword;
