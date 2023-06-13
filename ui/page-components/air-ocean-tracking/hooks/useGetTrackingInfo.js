import { useRouter } from '@/packages/next';
import { useRequest } from '@/packages/request';

const useGetShipmentInfo = () => {
	const { query } = useRouter();

	const { trackingType = '', trackingId = '' } = query;

	const [{ data, loading }] = useRequest({
		method : 'get',
		url    : '/get_saas_container_subscription',
		params : {
			id: trackingId,
		},
	}, { manual: false });

	return {
		data, loading, trackingType,
	};
};

export default useGetShipmentInfo;
