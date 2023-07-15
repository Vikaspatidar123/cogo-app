import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import ViewQuote from '@/ui/page-components/quotation/ViewQuote';

export async function getServerSideProps({ locale }) {
	return {
		props: {
			...(await serverSideTranslations(locale, ['common'])),

		},
	};
}
export default ViewQuote;
