import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import Dashboard from '@/ui/page-components/dashboard';

export async function getServerSideProps({ locale }) {
    return {
        props: {
            ...(await serverSideTranslations(locale, ['common', 'dashboard'])),

        },
    };
}

export default Dashboard;
