import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import ActiveFreightRateTrend from '@/ui/page-components/freight-rate-trend/active-freight-rate-trend';

export async function getServerSideProps({ locale }) {
    return {
        props: {
            ...(await serverSideTranslations(locale, ['common'])),

        },
    };
}
export default ActiveFreightRateTrend;
