import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import UserShipmentAlert from '@/ui/page-components/user_shipment_alert/components';

export async function getServerSideProps({ locale }) {
	return {
		props: {
			...(await serverSideTranslations(locale, ['common', 'dashboard'])),

		},
	};
}

export default UserShipmentAlert;
