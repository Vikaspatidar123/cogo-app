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
	});

	return { data, refetch, shipmentLoading: isLoading };
};
export default useGetShipmentList;
