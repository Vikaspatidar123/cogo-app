import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import CogoSubscriptions from '@/ui/page-components/cogo-subscriptions/components/manage-subscription';

export async function getServerSideProps({ locale }) {
    return {
        props: {
            ...(await serverSideTranslations(locale, ['common'])),

        },
    };
}
export default CogoSubscriptions;
