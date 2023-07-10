import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import MyCart from '@/ui/page-components/cogo-store/components/Cart';

export async function getServerSideProps({ locale }) {
	return {
		props: {
			...(await serverSideTranslations(locale, ['common', 'cogoStore'])),

		},
	};
}

export default MyCart;
