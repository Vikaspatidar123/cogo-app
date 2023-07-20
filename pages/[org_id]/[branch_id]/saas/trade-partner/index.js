import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import TradePartner from '@/ui/page-components/trade-partner/components/Tradepartner';

export async function getServerSideProps({ locale }) {
	return {
		props: {
			...(await serverSideTranslations(locale, ['common', 'tradePartner'])),

		},
	};
}
export default TradePartner;
