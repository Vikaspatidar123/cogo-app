import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import Archived from '@/ui/page-components/trade-partner/components/Archived';

export async function getServerSideProps({ locale }) {
    return {
        props: {
            ...(await serverSideTranslations(locale, ['common'])),

        },
    };
}
export default Archived;
