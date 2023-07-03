import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import MobileMenu from '../../../ui/commons/components/MenuMobileView';

export async function getServerSideProps({ locale }) {
	return {
		props: {
			...(await serverSideTranslations(locale, ['common'])),

		},
	};
}

export default MobileMenu;
