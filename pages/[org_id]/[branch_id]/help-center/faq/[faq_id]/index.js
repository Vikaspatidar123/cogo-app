import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import { Faq } from '@/ui/page-components/help-center';

export async function getServerSideProps({ locale }) {
	return {
		props: {
			...(await serverSideTranslations(locale, ['common', 'helpCenter'])),
		},
	};
}

export default Faq;
