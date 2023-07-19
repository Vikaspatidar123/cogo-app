import { useCallback, useEffect, useState } from 'react';

import { useRouter } from '@/packages/next';
import { useRequest } from '@/packages/request';



const useTrackShipment = () => {
    const { query } = useRouter();
    const { branch_id } = query;

    const [{ loading, data }, trigger] = useRequest({
        method: 'get',
        url: '/list_saas_container_subscriptions_summary',
    }, { manual: true });

    const getSummary = useCallback(() => {
        try {
            trigger({
                params: {
                    filters: {
                        organization_branch_id: branch_id,
                    },
                    page: 1,
                    page_limit: 7,
                    filter_data_required: true,
                },
            });
        } catch (err) {
            console.log(err);
        }
    }, [branch_id, trigger]);

    useEffect(() => {
        getSummary();
    }, [getSummary]);

    return {
        data,
        loading
    };
};

export default useTrackShipment;
