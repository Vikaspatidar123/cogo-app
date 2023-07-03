import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import InsuranceFrom from '@/ui/page-components/insurance/components/InsuranceForm';

export async function getServerSideProps({ locale }) {
    return {
        props: {
            ...(await serverSideTranslations(locale, ['common'])),

        },
    };
}
export default InsuranceFrom;
