import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import ShipmentAlerts from '@/ui/page-components/profile/components/ProfileDetails/AccountDetails/DetailsTabs/AlertsPreferences/ShipmentAlerts';

export async function getServerSideProps({ locale }) {
	return {
		props: {
			...(await serverSideTranslations(locale, ['common', 'settings'])),

		},
	};
}

export default ShipmentAlerts;
