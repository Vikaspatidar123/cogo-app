import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import ArchiveList from '@/ui/page-components/product-catalouge/components/ArchiveList/List';

export async function getServerSideProps({ locale }) {
	return {
		props: {
			...(await serverSideTranslations(locale, ['common'])),

		},
	};
}
export default ArchiveList;
