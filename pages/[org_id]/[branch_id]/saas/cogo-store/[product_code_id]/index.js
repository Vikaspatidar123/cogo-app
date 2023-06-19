import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import ProductDetails from '@/ui/page-components/cogo-store/components/ProductDetails';

export async function getServerSideProps({ locale }) {
	return {
		props: {
			...(await serverSideTranslations(locale, ['common', 'cogoStore'])),
		},
	};
}

export default ProductDetails;
