import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import UserShipmentAlert from '@/ui/page-components/user_shipment_alert/components';

export async function getServerSideProps(ctx) {
	const { locale } = ctx;

	const { location } = ctx?.req?.cookies || {};

	const translationData = await serverSideTranslations(locale, ['common', 'dashboard']);
	return {
		props: {
			translationData,
			location,
		},
	};
}

export default UserShipmentAlert;
