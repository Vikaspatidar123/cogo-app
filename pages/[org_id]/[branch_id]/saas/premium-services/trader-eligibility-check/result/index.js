import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import ListPage from '@/ui/page-components/trader-eligibility-check/components/ListPage';

export async function getServerSideProps({ locale }) {
    return {
        props: {
            ...(await serverSideTranslations(locale, ['common'])),

        },
    };
}
export default ListPage;
