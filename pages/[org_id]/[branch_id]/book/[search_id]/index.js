import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import SearchResults from '@/ui/page-components/discover_rates/components/Results';

export async function getServerSideProps({ locale }) {
    return {
        props: {
            ...(await serverSideTranslations(locale, ['common'])),

        },
    };
}
export default SearchResults;
