import { useRequest } from '@/packages/request';
import { useSelector } from '@/packages/store';

const useGetServiceWiseOutstandings = () => {
	const { registration_number, kyc_status } = useSelector(({ profile }) => ({
		registration_number : profile?.organization?.registration_number,
		kyc_status          : profile?.organization?.kyc_status,
	}));

	const isAutoCall = kyc_status === 'verified' && registration_number !== null;

	const [{ loading, data }] = useRequest({
		url    : '/get_service_wise_outstanding_stats',
		method : 'get',
		params : { registration_number: registration_number || undefined },
	}, { manual: isAutoCall, autoCancel: true });

	return {
		serviceWiseLoading : loading,
		serviceWiseStats   : data,
	};
};

export default useGetServiceWiseOutstandings;
