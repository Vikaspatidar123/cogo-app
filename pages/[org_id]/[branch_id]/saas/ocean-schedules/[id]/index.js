import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import ActiveSchedules from '@/ui/page-components/ocean-schedules/components/ActiveSchedules';

export async function getServerSideProps({ locale }) {
	return {
		props: {
<<<<<<< HEAD
			...(await serverSideTranslations(locale, ['common'])),
=======
			...(await serverSideTranslations(locale, ['common', 'oceanSchedule'])),
>>>>>>> 6a65545b6360459502afcdaa493577e6aa907bbe

		},
	};
}
export default ActiveSchedules;
