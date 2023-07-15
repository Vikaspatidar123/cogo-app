import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import setCookieAndRedirect from '@/ui/commons/utils/setCookieAndRedirect';
import DraftAirwayBill from '@/ui/page-components/draftAirwayBill';
import draftAirwayBill from '@/ui/page-components/draftAirwayBill/useDraftAirwayBill';

export async function getServerSideProps(ctx) {
    const { query, locale } = ctx;
    const { id } = query;
    try {
        const res = await draftAirwayBill({
            email_token: id,
            platform: 'app',
            auth_scope: 'organization',
        });

        const { hasError } = res || {};

        if (!hasError) {
            const {
                token,
                organization_id = '',
                organization_branch_id = '',
                shipment_id = '',
            } = (res || {}).data || {};

            setCookieAndRedirect(
                token,
                ctx,
                `${organization_id}/${organization_branch_id}/shipments/${shipment_id}`,
            );
        } else {
            return {
                res,
            };
        }
    } catch (e) {
        console.error(e);
    }
    return {
        props: {
            ...(await serverSideTranslations(locale, ['common'])),
        },
    };
}

export default DraftAirwayBill;
