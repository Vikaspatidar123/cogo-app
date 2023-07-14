import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import ListDsr from '@/ui/page-components/ocean-tracking/ListDsr';

export async function getServerSideProps({ locale }) {
	return {
		props: {
			...(await serverSideTranslations(locale, ['common'])),

		},
	};
}
export default ListDsr;
