import { Toast } from '@cogoport/components';
import { useEffect, useCallback } from 'react';

import { useRequest } from '@/packages/request';

const useProgres = () => {
    const [{ loading, data }, trigger] = useRequest({
        url: '/get_organization_profile_progress',
        method: 'get',
    }, { manual: true });

    const fetchSearch = useCallback(() => {
        try {
            trigger({});
        } catch (error) {
            Toast.error(error?.message);
        }
    }, [trigger]);

    useEffect(() => {
        fetchSearch();
    }, [fetchSearch]);
    return { loading, data };
};
export default useProgres;
