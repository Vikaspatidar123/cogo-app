import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import TrackerDetails from '@/ui/page-components/air-tracking/components/tracker-details';

export async function getServerSideProps({ locale }) {
    return {
        props: {
            ...(await serverSideTranslations(locale, ['common'])),

        },
    };
}
export default TrackerDetails;
