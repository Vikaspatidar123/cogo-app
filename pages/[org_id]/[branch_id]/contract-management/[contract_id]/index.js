import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import Dashboard from '@/ui/page-components/contract-management/components/ShipmentPlan';

export async function getServerSideProps({ locale }) {
	return {
		props: {
			...(await serverSideTranslations(locale, ['common'])),

		},
	};
}
export default Dashboard;
