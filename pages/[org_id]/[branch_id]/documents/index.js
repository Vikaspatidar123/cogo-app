import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import Documents from '@/ui/page-components/documents/components';

export async function getServerSideProps({ locale }) {
    return {
        props: {
            ...(await serverSideTranslations(locale, ['common'])),

        },
    };
}

export default Documents;
