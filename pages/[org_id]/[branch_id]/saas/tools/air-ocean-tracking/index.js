import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import { Dashboard } from '@/ui/page-components/air-ocean-tracking';

export async function getServerSideProps({ locale }) {
	return {
		props: {
			...(await serverSideTranslations(locale, ['common', 'airOceanTracking'])),

		},
	};
}
export default Dashboard;
