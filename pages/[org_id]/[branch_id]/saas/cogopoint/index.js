import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import { CogoPoints } from '@/ui/page-components/cogopoint';

export async function getServerSideProps({ locale }) {
    return {
        props: {
            ...(await serverSideTranslations(locale, ['common'])),

        },
    };
}
export default CogoPoints;
