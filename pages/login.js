// export { Login as default } from '@/ui/page-components/authentication';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import { Login } from '@/ui/page-components/authentication';

export async function getServerSideProps({ locale }) {
	return {
		props: {
			...(await serverSideTranslations(locale, ['common'])),

		},
	};
}

export default Login;
