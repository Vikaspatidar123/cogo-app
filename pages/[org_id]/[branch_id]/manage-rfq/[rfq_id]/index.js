import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import SelectQuotation from '@/ui/page-components/manage-rfq/components/SelectQuotation';

export async function getServerSideProps({ locale }) {
    return {
        props: {
            ...(await serverSideTranslations(locale, ['common'])),

        },
    };
}
export default SelectQuotation;
