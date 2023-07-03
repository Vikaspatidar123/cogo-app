import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import CreateRfq from '@/ui/page-components/manage-rfq/components/CreateRfq';

export async function getServerSideProps({ locale }) {
    return {
        props: {
            ...(await serverSideTranslations(locale, ['common'])),

        },
    };
}
export default CreateRfq;
