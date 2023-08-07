import { useQuery } from '@/packages/request';
import { getShipmentReport } from '@/ui/api/get';

const useStatusReport = () => {
	const {
		data,
		refetch,
		isLoading,
	} =	useQuery({
		queryKey : 'tracking',
		queryFn  : getShipmentReport,
	});

	return { reportData: data, refetch, loading: isLoading };
};
export default useStatusReport;
