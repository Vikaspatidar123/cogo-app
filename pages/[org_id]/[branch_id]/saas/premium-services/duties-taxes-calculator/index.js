import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import DutiesTaxCalulator from '@/ui/page-components/duties-tax-calculator/components';

export async function getServerSideProps({ locale }) {
	return {
		props: {
			...(await serverSideTranslations(locale, ['common', 'traderEligibilityCheck'])),

		},
	};
}
export default DutiesTaxCalulator;
