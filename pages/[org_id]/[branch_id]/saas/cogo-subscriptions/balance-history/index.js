import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import BalanceHistory from '@/ui/page-components/cogo-subscriptions/components/balance-history/component';

export async function getServerSideProps({ locale }) {
	return {
		props: {
			...(await serverSideTranslations(locale, ['common', 'subscriptions'])),

		},
	};
}
export default BalanceHistory;
