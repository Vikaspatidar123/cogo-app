import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import PaymentDashboard from '@/ui/page-components/payment-dashboard';

export async function getServerSideProps({ locale }) {
	return {
		props: {
			...(await serverSideTranslations(locale, ['common', 'dashboard'])),

		},
	};
}

export default PaymentDashboard;
