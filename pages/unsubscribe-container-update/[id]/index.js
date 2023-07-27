import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import UnSubscribeFromTracking from '@/ui/page-components/unsubscribe_tracking';

export async function getServerSideProps({ locale }) {
	return {
		props: {
			...(await serverSideTranslations(locale, ['common', 'unSubscribeTracking'])),

		},
	};
}
export default UnSubscribeFromTracking;
