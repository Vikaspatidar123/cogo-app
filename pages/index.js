import Dashboard from '@/ui/page-components/dashboard';

import { serverSideTranslations } from 'next-i18next/serverSideTranslations';


export async function getServerSideProps({ locale }) {
    return {
        props: {
            ...(await serverSideTranslations(locale, ['common'])),

        },
    };
}

export default Dashboard;