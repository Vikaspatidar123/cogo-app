import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import { VerifyAutoSignUpSaas } from '@/ui/page-components/authentication/index';

export async function getServerSideProps({ locale }) {
	return {
		props: {
			...(await serverSideTranslations(locale, ['common'])),

		},
	};
}

export default VerifyAutoSignUpSaas;
