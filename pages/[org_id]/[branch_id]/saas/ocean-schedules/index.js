import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import OceanSchedules from '@/ui/page-components/ocean-schedules';

export async function getServerSideProps({ locale }) {
    return {
        props: {
            ...(await serverSideTranslations(locale, ['common'])),

        },
    };
}
export default OceanSchedules;
