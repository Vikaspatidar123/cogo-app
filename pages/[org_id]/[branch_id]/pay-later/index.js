import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import PayLater from '@/ui/page-components/pay-later/components';

export async function getServerSideProps({ locale }) {
	return {
		props: {
			...(await serverSideTranslations(locale, ['common'])),

		},
	};
}
export default PayLater;
