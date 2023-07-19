import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import Unsubscribe from '@/ui/page-components/unsubscribe-page';

export async function getServerSideProps({ locale }) {
	return {
		props: {
			...(await serverSideTranslations(locale, ['common', 'cancellationTicket'])),

		},
	};
}

export default Unsubscribe;
