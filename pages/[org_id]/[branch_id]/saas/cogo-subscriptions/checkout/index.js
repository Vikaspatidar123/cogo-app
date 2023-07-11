import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import CogoSubscriptionCheckoutPage from '@/ui/page-components/cogo-subscriptions/components/checkout';

export async function getServerSideProps({ locale }) {
	return {
		props: {
			...(await serverSideTranslations(locale, ['common'])),

		},
	};
}
export default CogoSubscriptionCheckoutPage;
