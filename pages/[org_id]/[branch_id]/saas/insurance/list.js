import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import ListView from '@/ui/page-components/insurance/components/ListView';

export async function getServerSideProps({ locale }) {
	return {
		props: {
			...(await serverSideTranslations(locale, ['common'])),

		},
	};
}
export default ListView;
