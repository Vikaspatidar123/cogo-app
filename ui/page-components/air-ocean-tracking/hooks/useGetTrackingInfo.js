import { useRouter } from '@/packages/next';
import { useRequest } from '@/packages/request';

const SHIPMENT_DATA_URL = {
	ocean : '/get_saas_container_subscription',
	air   : '/get_saas_air_subscription',
};

const useGetShipmentInfo = () => {
	const { query } = useRouter();

	const { trackingType = '', trackingId = '' } = query;

	const [{ data, loading }] = useRequest({
		method : 'get',
		url    : SHIPMENT_DATA_URL[trackingType],
		params : {
			id: trackingId,
		},
	}, { manual: false });

	return {
		data, loading, trackingType,
	};
};

export default useGetShipmentInfo;
