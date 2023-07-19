import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import HsClassification from '@/ui/page-components/hs-code-classification';

export async function getServerSideProps({ locale }) {
	return {
		props: {
			...(await serverSideTranslations(locale, ['common', 'hsClassification'])),

		},
	};
}
export default HsClassification;
