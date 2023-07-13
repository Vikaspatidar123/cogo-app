import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import TraderEligibiltyCheck from '@/ui/page-components/trader-eligibility-check';

export async function getServerSideProps(context) {
	const { locale } = context;

	return {
		props: {
			...(await serverSideTranslations(locale, ['traderEligibilityCheck', 'common'])),
		},
	};
}

export default TraderEligibiltyCheck;
