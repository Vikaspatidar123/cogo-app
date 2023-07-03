import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import Shipment from '@/ui/page-components/shipments/components/ShipmentDetails';

export async function getServerSideProps({ locale }) {
    return {
        props: {
            ...(await serverSideTranslations(locale, ['common'])),

        },
    };
}
export default Shipment;
