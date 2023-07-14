import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import AirTracking from '@/ui/page-components/air-tracking';

export async function getServerSideProps({ locale }) {
	return {
		props: {
			...(await serverSideTranslations(locale, ['common'])),

		},
	};
}
export default AirTracking;
