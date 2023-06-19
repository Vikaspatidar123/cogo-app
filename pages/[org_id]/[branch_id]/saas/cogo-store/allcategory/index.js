import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import Main from '@/ui/page-components/cogo-store/components/Main';

export async function getServerSideProps({ locale }) {
	return {
		props: {
			...(await serverSideTranslations(locale, ['common', 'cogoStore'])),

		},
	};
}

export default Main;
