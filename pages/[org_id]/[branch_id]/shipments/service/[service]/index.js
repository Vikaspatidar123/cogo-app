import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import ShipmentList from '@/ui/page-components/shipments';

export async function getServerSideProps({ locale }) {
    return {
        props: {
            ...(await serverSideTranslations(locale, ['common'])),

        },
    };
}
export default ShipmentList;
