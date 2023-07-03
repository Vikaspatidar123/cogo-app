import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import TraderEligibiltyCheck from '@/ui/page-components/trader-eligibility-check';

export async function getServerSideProps({ locale }) {
    return {
        props: {
            ...(await serverSideTranslations(locale, ['common'])),

        },
    };
}
export default TraderEligibiltyCheck;
