import { useEffect } from 'react';

import { useRequest } from '@/packages/request';
import { useSelector } from '@/packages/store';

const useGetServiceWiseOutstandings = () => {
	const { registration_number, kyc_status } = useSelector(
		({ profile }) => ({
			registration_number : profile?.organization?.registration_number,
			kyc_status          : profile?.organization?.kyc_status,
		}),
	);

	const triggerApi = kyc_status === 'verified' && registration_number !== null;

	const [{ loading, data }, trigger] = useRequest(
		{
			url        : '/get_service_wise_outstanding_stats',
			method     : 'get',
			autoCancel : true,
		},
		{ manual: true },
	);

	useEffect(() => {
		if (triggerApi) {
			trigger({
				params: {
					registration_number: registration_number || undefined,
				},
			});
		}
	}, []);

	return {
		serviceWiseLoading : loading,
		serviceWiseStats   : data || [],
	};
};

export default useGetServiceWiseOutstandings;
