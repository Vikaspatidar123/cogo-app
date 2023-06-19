import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import OrderHistory from '@/ui/page-components/cogo-store/components/OrderHistory';

export async function getServerSideProps({ locale }) {
	return {
		props: {
			...(await serverSideTranslations(locale, ['common', 'cogoStore'])),
		},
	};
}

export default OrderHistory;
