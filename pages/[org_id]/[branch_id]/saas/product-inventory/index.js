import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import ProductInventory from '@/ui/page-components/product-catalouge';

export async function getServerSideProps({ locale }) {
	return {
		props: {
			...(await serverSideTranslations(locale, ['common'])),

		},
	};
}
export default ProductInventory;
