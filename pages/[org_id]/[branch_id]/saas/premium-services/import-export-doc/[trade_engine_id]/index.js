import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import { Checkout } from '@/ui/page-components/import-export-documents';

export async function getServerSideProps({ locale }) {
    return {
        props: {
            ...(await serverSideTranslations(locale, ['common'])),

        },
    };
}
export default Checkout;
