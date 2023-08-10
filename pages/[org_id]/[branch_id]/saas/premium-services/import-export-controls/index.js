import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import { Main } from '@/ui/page-components/import-export-controls';

export async function getServerSideProps({ locale }) {
	return {
		props: {
			...(await serverSideTranslations(locale, ['common', 'importExportControls', 'iecResult'])),

		},
	};
}
export default Main;
