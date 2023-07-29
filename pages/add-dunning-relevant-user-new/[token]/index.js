import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import AddRelevantUserNew from '@/ui/page-components/add-dunning-relevant-user-new';

export async function getServerSideProps({ locale }) {
	return {
		props: {
			...(await serverSideTranslations(locale, ['common'])),

		},
	};
}

export default AddRelevantUserNew;
