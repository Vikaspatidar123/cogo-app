import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import { List } from '@/ui/page-components/air-ocean-tracking';

export async function getServerSideProps({ locale }) {
	return {
		props: {
			...(await serverSideTranslations(locale, ['common', 'airOceanTracking'])),

		},
	};
}

export default List;
