import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import OceanTracking from '@/ui/page-components/ocean-tracking';

export async function getServerSideProps({ locale }) {
	return {
		props: {
			...(await serverSideTranslations(locale, ['common'])),

		},
	};
}

export default OceanTracking;
