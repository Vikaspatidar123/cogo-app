import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import { Signup } from '@/ui/page-components/authentication-v2';

export async function getServerSideProps({ locale }) {
	return {
		props: {
			...(await serverSideTranslations(locale, ['common'])),

		},
	};
}
export default Signup;
