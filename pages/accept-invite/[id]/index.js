import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import AcceptUser from '@/ui/page-components/accept-user';

export async function getServerSideProps({ locale }) {
    return {
        props: {
            ...(await serverSideTranslations(locale, ['common'])),

        },
    };
}

export default AcceptUser;
