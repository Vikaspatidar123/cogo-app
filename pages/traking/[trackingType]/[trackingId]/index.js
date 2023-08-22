import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import TrakingPage from '@/ui/page-components/traking-page';

export async function getServerSideProps({ locale }) {
	return {
		props: {
			...(await serverSideTranslations(locale, ['common', 'airOceanTracking'])),

		},
	};
}
export default TrakingPage;
