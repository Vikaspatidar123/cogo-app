import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import DashBoard from '@/ui/page-components/new-dashboard';

export async function getServerSideProps({ locale }) {
    return {
        props: {
            ...(await serverSideTranslations(locale, ['common', 'dashboard'])),

        },
    };
}

export default DashBoard