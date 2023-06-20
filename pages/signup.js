import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import { Signup } from '@/ui/page-components/authentication';

export async function getServerSideProps({ locale }) {
	return {
		props: {
			...(await serverSideTranslations(locale, ['common'])),

		},
	};
}
export default Signup;
