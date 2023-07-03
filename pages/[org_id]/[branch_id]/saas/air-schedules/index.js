import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import AirSchedules from '@/ui/page-components/air-schedules';

export async function getServerSideProps({ locale }) {
	return {
		props: {
			...(await serverSideTranslations(locale, ['common'])),

		},
	};
}
export default AirSchedules;
