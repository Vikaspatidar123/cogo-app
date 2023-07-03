import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import CreateQuotation from '@/ui/page-components/quotation/CreateQuotation';

export async function getServerSideProps({ locale }) {
    return {
        props: {
            ...(await serverSideTranslations(locale, ['common'])),

        },
    };
}
export default CreateQuotation;
