import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import ExportFactoring from '@/ui/page-components/export-factoring/components';

export async function getServerSideProps({ locale }) {
	return {
		props: {
			...(await serverSideTranslations(locale, ['common'])),

		},

	};
}

export default ExportFactoring;
