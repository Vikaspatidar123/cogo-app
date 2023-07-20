import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import { GetStarted } from '@/ui/page-components/authentication';

export async function getServerSideProps({ locale }) {
	return {
		props: {
			...(await serverSideTranslations(locale, ['common', 'authentication'])),

		},
	};
}

export default GetStarted;
