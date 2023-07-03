import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import ForgotPassowrd from '@/ui/page-components/forgot-password';

export async function getServerSideProps({ locale }) {
    return {
        props: {
            ...(await serverSideTranslations(locale, ['common'])),

        },
    };
}
export default ForgotPassowrd;
