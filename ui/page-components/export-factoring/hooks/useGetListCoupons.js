import { useCallback, useEffect } from 'react';

import { useRequest } from '@/packages/request';
import { useSelector } from '@/packages/store';

const useGetListCoupons = ({ getCreditRequestResponse = {} }) => {
	const { default_application_fees_details = {} } = getCreditRequestResponse || {};

	const { application_fee = 0, application_fee_currency = '' } = default_application_fees_details || {};
	const { profile: { organization } } = useSelector((state) => state);

	const [{ data, loading }, trigger] = useRequest({
		method : 'get',
		url    : '/list_coupons',
	}, { manual: true, autoCancel: false });

	const getCoupons = useCallback(() => {
		try {
			trigger({
				params: {
					organization_id : organization?.id,
					total_amount    : application_fee,
					currency        : application_fee_currency,
					category        : 'export_factoring',
				},
			});
		} catch (e) {
			console.error(e);
		}
	}, [application_fee, application_fee_currency, organization?.id, trigger]);

	useEffect(() => { getCoupons(); }, [getCoupons]);

	return { data, loading };
};

export default useGetListCoupons;
