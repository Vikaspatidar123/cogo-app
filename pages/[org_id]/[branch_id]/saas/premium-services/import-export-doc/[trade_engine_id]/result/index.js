import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import { Result } from '@/ui/page-components/import-export-documents';

export async function getServerSideProps({ locale }) {
	return {
		props: {
			...(await serverSideTranslations(locale, ['common', 'importExportDoc'])),

		},
	};
}
export default Result;
