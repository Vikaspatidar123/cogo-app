import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import OrderHistory from '@/ui/page-components/order-history';

export async function getServerSideProps({ locale }) {
	return {
		props: {
			...(await serverSideTranslations(locale, ['common', 'orderHistory', 'iecResult', 'iedResult'])),

		},
	};
}

export default OrderHistory;
