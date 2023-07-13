import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import { Main } from '@/ui/page-components/import-export-documents';

export async function getServerSideProps({ locale }) {
	return {
		props: {
			...(await serverSideTranslations(locale, ['common', 'importExportDoc'])),

		},
	};
}
export default Main;
