import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import DiscoverRates from '@/ui/page-components/discover_rates';

export async function getServerSideProps({ locale }) {
    return {
        props: {
            ...(await serverSideTranslations(locale, ['common'])),

        },
    };
}
export default DiscoverRates;
