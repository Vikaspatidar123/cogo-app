import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import TransactionHistory from '@/ui/page-components/transactionHistory/component';

export async function getServerSideProps({ locale }) {
	return {
		props: {
			...(await serverSideTranslations(locale, ['common', 'iecResult', 'iedResult', 'tecResult', 'dtResult'])),

		},
	};
}
export default TransactionHistory;
