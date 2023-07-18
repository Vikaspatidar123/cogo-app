import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import { ProfileDetails } from '@/ui/page-components/profile';

export async function getServerSideProps({ locale }) {
	return {
		props: {
			...(await serverSideTranslations(locale, ['common', 'settings'])),

		},
	};
}

export default ProfileDetails;
