import { useEffect } from 'react';

import { useRequestBf } from '@/packages/request';
import { useSelector } from '@/packages/store';
import GLOBAL_CONSTANTS from '@/ui/commons/constants/globals';

const useGetOrganizationOutstandings = () => {
	const { serial_id, kyc_status, entity_code } = useSelector(({ profile }) => ({
		serial_id   : profile?.organization?.serial_id,
		kyc_status  : profile?.organization?.kyc_status,
		entity_code : profile?.organization?.entity_code,

	}));

	const isVerified = kyc_status === 'verified' && serial_id !== null;

	const [{ loading, data }, trigger] = useRequestBf({
		url     : '/payments/outstanding/by-customer',
		method  : 'get',
		authKey : 'get_payments_outstanding_by_customer',
	});

	useEffect(() => {
		if (isVerified) {
			trigger({
				params: {
					organizationSerialId : serial_id || undefined,
					entityCode           : entity_code,
				},
			});
		}
	}, [isVerified, serial_id, entity_code, trigger]);

	const dataStatsList = data?.list?.[GLOBAL_CONSTANTS.zeroth_index] || {};

	return {
		statsList    : dataStatsList,
		statsLoading : loading,
	};
};

export default useGetOrganizationOutstandings;
