import { Signup } from '@/ui/page-components/authentication';

import { serverSideTranslations } from 'next-i18next/serverSideTranslations';


export async function getServerSideProps({ locale }) {
    return {
        props: {
            ...(await serverSideTranslations(locale, ['common'])),

        },
    };
}

export default Signup;