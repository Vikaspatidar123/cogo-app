import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import Insurance from '@/ui/page-components/insurance/index';

export async function getServerSideProps({ locale }) {
    return {
        props: {
            ...(await serverSideTranslations(locale, ['common'])),

        },
    };
}
export default Insurance;
