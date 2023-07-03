import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import LiveVesselTracking from '@/ui/page-components/live-vessel-tracking';

export async function getServerSideProps({ locale }) {
	return {
		props: {
			...(await serverSideTranslations(locale, ['common'])),

		},
	};
}
export default LiveVesselTracking;
