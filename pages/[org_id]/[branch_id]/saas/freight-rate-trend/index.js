import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import FreightRateTrend from '@/ui/page-components/freight-rate-trend';

export async function getServerSideProps({ locale }) {
	return {
		props: {
			...(await serverSideTranslations(locale, ['common', 'frt'])),

		},
	};
}
export default FreightRateTrend;
