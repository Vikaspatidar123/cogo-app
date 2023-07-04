import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import TraderEligibiltyCheck from './components';

export async function getServerSideProps(context) {
	const { locale } = context;

	return {
		props: {
			...(await serverSideTranslations(locale, ['traderEligibilityCheck'])),
		},
	};
}

export default TraderEligibiltyCheck;
