import { upperCase } from '@cogoport/utils';
import { useCallback, useState } from 'react';

import { useForm } from '@/packages/forms';
import { useRouter } from '@/packages/next';
import { useRequest } from '@/packages/request';

const useCreateTracker = () => {
    const { query, push } = useRouter();
    const [trackingType, setTrackingType] = useState('ocean');
    const redirectToTracker = ({ type, id, isFirst = false, fromDashBoard = false }) => {
        push(
            '/saas/tools/air-ocean-tracking/list/[trackingType]/'
            + `[trackingId]?isFirstVisit=${isFirst}&fromDashBoard=${fromDashBoard}`,
            `/saas/tools/air-ocean-tracking/list/${type}/${id}?isFirstVisit=${isFirst}&fromDashBoard=${fromDashBoard}`,
        );
    };
    const { branch_id } = query || {};

    const [{ loading: load }, trigger] = useRequest({
        method: 'get',
        url: '/get_shipping_line_for_container_no',
    }, { manual: true });

    const [{ loading }, createTrigger] = useRequest({
        method: 'post',
        url: '/create_saas_container_subscription',
    }, { manual: true });

    const formHook = useForm();

    const getOperatorInfo = useCallback(({ shipmentNo }) => {
        try {
            trigger({
                params: {
                    container_no: upperCase(shipmentNo),
                },
            });
        } catch (err) {
            console.log(err);
        }
    }, [trigger]);

    const createTracker = async ({ payload }) => {
        try {
            const res = await createTrigger({
                data: {
                    ...payload,
                    organization_branch_id: branch_id,
                },
            });
            const { id } = res?.data || {};
            redirectToTracker({ type: trackingType, id, isFirst: true });
        } catch (err) {
            console.log(err, 'err');
        }
    };

    const onSubmitHandler = (formData) => {
        const { shipmentNumber: shipmentNo = '', shippingLine = '' } = formData || {};

        const payload = {
            shipping_line_id: shippingLine,
            search_value: shipmentNo,
        };

        createTracker({ payload });
    };

    return {
        loading,
        getOperatorInfo,
        formHook,
        setTrackingType,
        trackingType,
        onSubmitHandler,
        load,
    };
};

export default useCreateTracker;
