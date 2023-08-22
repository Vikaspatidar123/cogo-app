import { useQuery } from '@/packages/request';
import { getShipmentList } from '@/ui/api/get';

const useGetShipmentList = () => {
	const {
		data,
		refetch,
		isLoading,
	} =	useQuery({
		queryKey : 'shipment_list',
		queryFn  : getShipmentList,
		options  : {
			refetchOnMount: true,
		},
	});

	return { data, refetchList: refetch, shipmentLoading: isLoading };
};
export default useGetShipmentList;
