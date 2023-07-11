import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import ListQuotation from '@/ui/page-components/quotation/ListView';

export async function getServerSideProps({ locale }) {
	return {
		props: {
			...(await serverSideTranslations(locale, ['common'])),

		},
	};
}
export default ListQuotation;
