import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import ActiveSchedules from '@/ui/page-components/air-schedules/components/ActiveSchedules';

export async function getServerSideProps({ locale }) {
	return {
		props: {
			...(await serverSideTranslations(locale, ['common', 'airSchedule'])),

		},
	};
}
export default ActiveSchedules;
