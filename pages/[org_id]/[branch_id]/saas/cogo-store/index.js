import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import { CogoStore } from '@/ui/page-components/cogo-store';

export async function getServerSideProps({ locale }) {
	return {
		props: {
			...(await serverSideTranslations(locale, ['common', 'cogoStore'])),
		},
	};
}

export default CogoStore;
