import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import { VerifyAutoSignUpEmail } from '@/ui/page-components/authentication/index';

export async function getServerSideProps({ locale }) {
	return 	{
		props: {
			...(await serverSideTranslations(locale, ['common', 'verifyAutoLogin'])),

		},
	};
}

export default VerifyAutoSignUpEmail;
