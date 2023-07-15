import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import DraftAirwayBill from '@/ui/page-components/draftAirwayBill';

export async function getServerSideProps({ locale }) {
    return {
        props: {
            ...(await serverSideTranslations(locale, ['common'])),

        },
    };
}

export default DraftAirwayBill;
